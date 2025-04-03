pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'yaashwin06'  // Your DockerHub username
        DOCKERHUB_REPO = 'earthly_image'  // Your DockerHub image repository name
        DOCKERHUB_PASSWORD = credentials('dockerhub-password')  // Reference the credential ID
        DOCKER_IMAGE_NAME = "${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Login to DockerHub') {
            steps {
                script {
                    sh """
                        echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin
                    """
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE_NAME}:latest .'
                    sh 'docker push ${DOCKER_IMAGE_NAME}:latest'
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded"
        }
        failure {
            echo "Pipeline failed"
        }
    }
}
