pipeline {
    agent any

    stages {

        stage('Checkout Git') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

    }
}