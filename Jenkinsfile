pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    parameters {
          choice(
            name: 'ENV',
            choices: ['qa', 'uat'],
            description: 'Select test environment'
        )

          choice(
            name: 'TEST_SUITE',
            choices: ['smoke', 'sanity', 'regression'],
            description: 'Select test suite'
        )
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
                script {
                   def usernameCredential = params.ENV == 'qa'
                    ? 'qa-username'
                    : 'uat-username'

                   def passwordCredential = params.ENV == 'qa'
                    ? 'qa-password'
                    : 'uat-password'

                   def baseUrl = params.ENV == 'qa'
                    ? 'https://www.saucedemo.com'
                    : 'https://www.saucedemo.com'

                   withEnv(["BASE_URL=${baseUrl}"]) {
                            withCredentials([
                                   string(
                                    credentialsId: usernameCredential,
                                    variable: 'TEST_USERNAME'
                                ),
                                   string(
                                    credentialsId: passwordCredential,
                                    variable: 'PASSWORD'
                                )
                            ]) {
                              bat 'npx playwright test'
                            }
                        }
                    }
            }     

            post {
                always {
                   archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

                   publishHTML([
                       reportDir: 'playwright-report',
                       reportFiles: 'index.html',
                       reportName: 'Playwright Report',
                       keepAll: true,
                       allowMissing: true
                    ])
                }
            }
        }

    }
}