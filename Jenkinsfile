pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'yaashwin06'  // Your DockerHub username
        DOCKERHUB_REPO = 'earthly_image'  // Your DockerHub image repository name
        DOCKERHUB_PASSWORD = credentials('dockerhub-password')  // DockerHub password stored as Jenkins secret
        DOCKER_IMAGE_NAME = "${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest"  // DockerHub image name
    }

    stages {
        stage('Login to DockerHub') {
            steps {
                script {
                    echo "Logging into DockerHub..."
                    sh """
                        echo ${DOCKERHUB_PASSWORD} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin
                    """
                }
            }
        }

        stage('Pull Docker Image from DockerHub') {
            steps {
                script {
                    echo "Pulling Docker image from DockerHub..."
                    sh "docker pull ${DOCKER_IMAGE_NAME}"
                }
            }
        }

        stage('Deploy Docker Container on WSL') {
            steps {
                script {
                    echo "Running Docker container in WSL..."
                    // Ensure Docker is installed and running on WSL before executing the command
                    sh """
                        docker run -d --name earthly_container ${DOCKER_IMAGE_NAME}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Docker container successfully deployed."
        }
        failure {
            echo "Pipeline failed."
        }
    }
}
