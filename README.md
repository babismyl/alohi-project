# alohi-project

## Overview

This project contains Playwright end-to-end tests for the authentication and navigation flows of [sign.plus](https://www.sign.plus/) and related applications as part of a technical take-home test. The suite validates critical user journeys—such as login, sign-up, and cross-app navigation—with a focus on reliability and real-world behavior.

## Tech Stack

- **Language:** TypeScript
- **Test Framework:** [Playwright](https://playwright.dev/)
- **CI/CD:** GitHub Actions (with automated HTML report publishing to GitHub Pages)
- **Browsers:** Chromium (`main`), with optional (commented) config for Firefox and WebKit

## Features

- **Page Object Model** for maintainable test code
- Tests for:
  - Home to login navigation
  - Valid and invalid login scenarios
  - Maintained login session across apps (Sign.Plus/Fax.Plus)
  - Sign-up page navigation and form validation
  - Social login redirections (Google, Microsoft, Apple)
- Comprehensive error message validation

## Getting Started

### Prerequisites

- Node.js (v20 or greater recommended)
- npm (comes with Node.js)

### Installation

Clone the repository and install dependencies:

```git clone https://github.com/babismyl/alohi-project.git
cd alohi-project
npm ci```

### Running Tests Locally

Execute the Playwright test suite using:

`npx playwright test`

**Alternative:**  
You can also use the NPM script:

`npm test`

#### Additional test scripts

- Run tests in headed mode:  
  `npx playwright test --headed`
- Launch Playwright's UI mode:  
  `npx playwright test --ui`
- Debug test runs:  
  `npx playwright test --debug`
- View HTML reports after running tests:  
  `npx playwright show-report`

### Project Structure

alohi-project/
├── tests/
│ ├── auth.spec.ts # Main authentication E2E tests
│ ├── pages/
│ │ ├── login.page.ts # Login page object
│ │ └── home.page.ts # Home page object
│ └── utils/
│ └── test-data.ts # Test users and error messages
├── playwright.config.ts # Playwright global configuration
├── package.json
├── .github/workflows/
│ └── playwright.yml # CI workflow configuration
└── README.md

### Continuous Integration

- **CI/CD via GitHub Actions:**  
  All pushes and pull requests to `main` trigger the Playwright E2E suite (`.github/workflows/playwright.yml`)
- **Test Reports:**  
  On completion, a detailed HTML report is uploaded to GitHub Pages for convenient result browsing.

## Design Decisions

- Tests are executed **sequentially**, not in parallel, for maximum reliability due to observed instability in parallel mode.
- Fully leverages Playwright’s trace/screenshot/video-on-failure features for easier debugging.
- Uses modern, maintainable page object best practices.

## Limitations & Future Improvements

- Only core authentication flows and cross-app session checks are currently covered.
- Coverage can be expanded to include full sign-up, edge cases, and mobile viewport tests.

## Credits

Developed by [babismyl](https://github.com/babismyl) as part of a take-home technical assessment.

---