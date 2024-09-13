pipeline {
    agent any

    stages {
        stage('Clonar Git') {
            steps {
               git branch: 'main', url: 'https://github.com/MSJantana/Gerador_Senha.git'
            }
        }
    }
}