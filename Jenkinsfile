pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'yaashwin06'  // Replace with your DockerHub username
        DOCKERHUB_REPO = 'earthly_image'  // Docker image name
        DOCKERHUB_PASSWORD = credentials('dockerhub-password')  // DockerHub credentials stored in Jenkins
        DOCKER_IMAGE_NAME = "${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}"
        WSL_DOCKER_SOCKET = '/mnt/wsl/docker.sock'  // WSL Docker socket location
    }

    stages {
        stage('Start Polling for New Docker Image') {
            steps {
                script {
                    // Polling for the new image every 1 minute
                    while(true) {
                        echo "Checking for the latest Docker image..."
                        // Pull the latest image from DockerHub
                        sh """
                            docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_PASSWORD}
                            docker pull ${DOCKER_IMAGE_NAME}:latest
                        """

                        // Run the Docker container using the latest image
                        sh """
                            docker stop my_nodejs_container || true
                            docker rm my_nodejs_container || true
                            docker run -d --name my_nodejs_container -p 8080:80 ${DOCKER_IMAGE_NAME}:latest
                        """

                        echo "Container started with the latest image"
                        
                        // Wait for 1 minute before checking again
                        sleep(time: 1, unit: 'MINUTES')
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
