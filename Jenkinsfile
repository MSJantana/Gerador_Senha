pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'msoftsantana/posgraduacao:latest'
    }

    stages {
        stage('Clonar Git') {
            steps {
               git branch: 'main', url: 'https://github.com/MSJantana/Gerador_Senha.git'
            }
        }
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build ("${DOCKER_IMAGE}")
                }
            }
        }
    }
}