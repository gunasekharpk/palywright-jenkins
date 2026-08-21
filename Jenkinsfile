pipeline {
    agent any

    environment {
        BASE_URL = 'https://www.saucedemo.com'
    }

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

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                 bat 'npx playwright test'
            }
        }

    }
}