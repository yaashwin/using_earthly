pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "${DOCKERHUB_USERNAME}/vivek-institute-backend"
        DOCKERHUB_USERNAME = credentials('dockerhub-username')  // Jenkins Credentials
        DOCKERHUB_PASSWORD = credentials('dockerhub-password')  // Jenkins Credentials
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Set up QEMU') {
            steps {
                script {
                    sh 'docker/setup-qemu-action@v2'  // Set up QEMU for Docker
                }
            }
        }

        stage('Set up Docker Buildx') {
            steps {
                script {
                    sh 'docker/setup-buildx-action@v2'  // Set up Docker Buildx
                }
            }
        }

        stage('Install Earthly') {
            steps {
                script {
                    sh '''
                        sudo /bin/sh -c 'wget https://github.com/earthly/earthly/releases/latest/download/earthly-linux-amd64 -O /usr/local/bin/earthly && chmod +x /usr/local/bin/earthly'
                        earthly --version
                    '''
                }
            }
        }

        stage('Generate build metadata') {
            steps {
                script {
                    env.DATE = sh(script: "date +'%Y-%m-%d'", returnStdout: true).trim()
                    env.SHA_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                }
            }
        }

        stage('Build Application with Earthly') {
            steps {
                script {
                    sh 'earthly +build'
                }
            }
        }

        stage('Login to DockerHub') {
            when {
                expression { return env.GITHUB_EVENT_NAME != 'pull_request' }
            }
            steps {
                script {
                    sh """
                        echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin
                    """
                }
            }
        }

        stage('Build and Push Docker Image') {
            when {
                expression { return env.GITHUB_EVENT_NAME != 'pull_request' }
            }
            steps {
                script {
                    sh """
                        earthly --push +docker --tag=latest --tag=${SHA_SHORT} --tag=${DATE}
                    """
                }
            }
        }
    }

    post {
        success {
            script {
                echo "Pipeline succeeded"
            }
        }
        failure {
            script {
                echo "Pipeline failed"
            }
        }
    }
}

