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

          choice(
          name: 'BROWSER',
          choices: ['chromium', 'firefox', 'webkit'],
          description: 'Select browser'
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

                   def testCommand

                    if (params.TEST_SUITE == 'smoke') {
                        testCommand = 'npx playwright test --grep @smoke'
                    } else if (params.TEST_SUITE == 'sanity') {
                        testCommand = 'npx playwright test --grep @sanity'
                    } else {
                        testCommand = 'npx playwright test'
                    }
                   echo "Environment: ${params.ENV}"
                   echo "Test Suite: ${params.TEST_SUITE}"
                   echo "Test Command: ${testCommand}"

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
                              
                                  bat testCommand
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