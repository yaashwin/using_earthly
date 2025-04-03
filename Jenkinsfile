pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "yaashwin06/earthly_image"  // Docker repository name
        DOCKERHUB_USERNAME = credentials('dockerhub-username')  // Jenkins credentials for Docker Hub username
        DOCKERHUB_PASSWORD = credentials('dockerhub-password')  // Jenkins credentials for Docker Hub PAT (password)
        DATE = sh(script: "date +'%Y-%m-%d'", returnStdout: true).trim()
        SHA_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm  // Checkout source code from the Git repository
            }
        }

        stage('Set up QEMU') {
            steps {
                script {
                    sh 'docker run --rm --privileged multiarch/qemu-user-static --reset -p yes'  // Set up QEMU for multi-platform builds
                }
            }
        }

        stage('Set up Docker Buildx') {
            steps {
                script {
                    sh 'docker buildx create --use'  // Set up Docker Buildx for advanced builds
                }
            }
        }

        stage('Install Earthly') {
            steps {
                script {
                    // Install Earthly tool
                    sh '''
                        earthly --version || (curl -sL https://github.com/earthly/earthly/releases/latest/download/earthly-linux-amd64 -o /usr/local/bin/earthly && chmod +x /usr/local/bin/earthly)
                    '''
                }
            }
        }

        stage('Build Application with Earthly') {
            steps {
                script {
                    sh 'earthly +build'  // Run Earthly build command
                }
            }
        }

        stage('Login to DockerHub') {
            when {
                expression { return env.GITHUB_EVENT_NAME != 'pull_request' }
            }
            steps {
                script {
                    // Docker login using Docker Hub username and token (PAT)
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
                    // Push the Docker image to Docker Hub with the provided tags
                    sh """
                        earthly --push +docker --tag=${DOCKER_IMAGE_NAME}:latest --tag=${DOCKER_IMAGE_NAME}:${SHA_SHORT} --tag=${DOCKER_IMAGE_NAME}:${DATE}
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
