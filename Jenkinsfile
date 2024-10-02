pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'msoftsantana/safepass:latest'
    }

    stages {
        stage('Clonar Git') {
            steps {
               git branch: 'main', url: 'https://github.com/MSJantana/Gerador_Senha.git'
            }        
        }
        stage('Construir Imagem Docker - Build') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE} .'
                }
            }
        }
    }       
}