import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// --------------------------------------------------
// 1. Read environment
// --------------------------------------------------

const environment = process.env.ENV || 'qa';
const browser = process.env.BROWSER || 'chromium';

// --------------------------------------------------
// 2. Load environment-specific .env file
// --------------------------------------------------
//
// ENV=qa  → config/.env.qa
// ENV=uat → config/.env.uat
//

dotenv.config({
    path: `config/.env.${environment}`
});

// --------------------------------------------------
// 3. Validate environment
// --------------------------------------------------

const supportedEnvironments = ['qa', 'uat'];

if (!supportedEnvironments.includes(environment)) {
    throw new Error(
        `Invalid environment: ${environment}. ` +
        `Supported environments: ${supportedEnvironments.join(', ')}`
    );
}

// --------------------------------------------------
// 4. Validate mandatory environment variables
// --------------------------------------------------

const requiredVariables = [
    'BASE_URL',
    'TEST_USERNAME',
    'PASSWORD'
];

for (const variable of requiredVariables) {

    if (!process.env[variable]) {
        throw new Error(
            `Missing required environment variable: ${variable}`
        );
    }
}

const browserDevices = {
    chromium: devices['Desktop Chrome'],
    firefox: devices['Desktop Firefox'],
    webkit: devices['Desktop Safari']
};

// --------------------------------------------------
// 5. Playwright configuration
// --------------------------------------------------

export default defineConfig({

    // ------------------------------------------------
    // Test location
    // ------------------------------------------------

    testDir: './tests',

    // ------------------------------------------------
    // Run test files in parallel
    // ------------------------------------------------

    fullyParallel: true,

    // ------------------------------------------------
    // Prevent accidental test.only in CI
    // ------------------------------------------------

    forbidOnly: !!process.env.CI,

    // ------------------------------------------------
    // Retry failed tests
    //
    // Local  → 0 retries
    // Jenkins → 2 retries
    // ------------------------------------------------

    retries: process.env.CI ? 2 : 0,

    // ------------------------------------------------
    // Workers
    //
    // Local can use multiple workers.
    // CI can be controlled through Jenkins.
    // ------------------------------------------------

    workers: process.env.CI ? 2 : undefined,

    // ------------------------------------------------
    // Reporter
    // ------------------------------------------------

    reporter: [
        ['list'],

        [
            'html',
            {
                outputFolder: 'playwright-report',
                open: 'never'
            }
        ]
    ],

    // ------------------------------------------------
    // Common settings for all projects
    // ------------------------------------------------

    use: {

        // --------------------------------------------
        // Environment-specific URL
        // --------------------------------------------

        baseURL: process.env.BASE_URL,

        // --------------------------------------------
        // Browser actions timeout
        // --------------------------------------------

        actionTimeout: 15000,

        // --------------------------------------------
        // Navigation timeout
        // --------------------------------------------

        navigationTimeout: 30000,

        // --------------------------------------------
        // Screenshot only when test fails
        // --------------------------------------------

        screenshot: 'only-on-failure',

        // --------------------------------------------
        // Video only when test fails
        // --------------------------------------------

        video: 'retain-on-failure',

        // --------------------------------------------
        // Trace only when test fails/retried
        // --------------------------------------------

        trace: 'retain-on-failure',

        // --------------------------------------------
        // Browser context settings
        // --------------------------------------------

        headless: true,

        // --------------------------------------------
        // Ignore HTTPS certificate errors if required
        // for internal QA/UAT environments
        // --------------------------------------------

        ignoreHTTPSErrors: true
    },

    // ------------------------------------------------
    // Global timeout for each test
    // ------------------------------------------------

    timeout: 60000,

    // ------------------------------------------------
    // Expect assertion timeout
    // ------------------------------------------------

    expect: {
        timeout: 10000
    },

    // ------------------------------------------------
    // Projects
    // ------------------------------------------------

    projects: [

        // ============================================
        // PROJECT 1 — Authentication Setup
        // ============================================

        {
            name: 'setup',

            testMatch: /auth\.setup\.js/
        },

        // ============================================
        // PROJECT 2 — Login Tests
        // ============================================

        {
            name: 'login',

            testMatch: /login\/.*\.spec\.js/,

            use: {
                ...browserDevices[browser]
            }
        },

        // ============================================
        // PROJECT 3 — E-commerce Tests
        // ============================================

        {
            name: 'ecommerce',

            testMatch: /ecommerce\/.*\.spec\.js/,

            dependencies: ['setup'],

            use: {
                ...browserDevices[browser],

                // Reuse authenticated customer session
                storageState:
                    'playwright/.auth/customer.json'
            }
        }
    ]
});