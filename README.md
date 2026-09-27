# API Test Automation — JSONPlaceholder

> A clean, CI-ready API testing showcase that validates a REST API two ways: a **Postman collection run with Newman** and a **JavaScript suite built on Playwright's request API**.

[![API Tests](https://github.com/Hamxa-Khalid/api-test-automation/actions/workflows/api-tests.yml/badge.svg)](https://github.com/Hamxa-Khalid/api-test-automation/actions/workflows/api-tests.yml)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Postman](https://img.shields.io/badge/Postman-FF6C37?logo=postman&logoColor=white)](https://www.postman.com/)
[![Newman](https://img.shields.io/badge/Newman-FF6C37?logo=postman&logoColor=white)](https://github.com/postmanlabs/newman)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

## Overview

This repository is a focused demonstration of **REST API test automation** against the reliable, free [JSONPlaceholder](https://jsonplaceholder.typicode.com) API. It exercises the full CRUD surface of the `/posts` resource, validates the `/users` resource, and covers negative scenarios — the kind of coverage a real API test plan needs.

It deliberately implements the **same coverage twice** using two industry-standard toolchains, so it can serve as a reference for teams choosing between a low-code (Postman/Newman) and a code-first (Playwright) approach.

> Note on JSONPlaceholder: write operations (`POST`/`PUT`/`PATCH`/`DELETE`) are *faked* server-side — nothing is persisted — but the service returns realistic response bodies and HTTP status codes. The tests assert exactly those contracts (e.g. `201 Created` on POST, echoed request body, `404` for missing resources).

## Tech Stack

| Tool | Role |
| --- | --- |
| [Playwright Test](https://playwright.dev/docs/test-api-testing) (`@playwright/test`) | Code-first API tests via the built-in `request` fixture |
| [Postman](https://www.postman.com/) Collection v2.1 | Low-code, shareable request + assertion collection |
| [Newman](https://github.com/postmanlabs/newman) | CLI runner that executes the Postman collection in CI |
| [Node.js](https://nodejs.org/) `>=18` | Runtime |
| [GitHub Actions](https://docs.github.com/en/actions) | Continuous integration for both suites |

## What's Covered

- **CRUD operations** — `GET`, `POST`, `PUT`, `PATCH`, `DELETE` on `/posts`
- **Status-code assertions** — `200`, `201`, and `404` verified explicitly
- **Response-body validation** — echoed request payloads and returned resource fields
- **Schema / shape validation** — per-field type checks on `/posts` and `/users` (id, name, username, email, address, company)
- **Data-format validation** — email fields matched against an email pattern
- **Request chaining** — a created post's `id` is captured into a collection variable and reused (Postman)
- **Negative tests** — non-existent posts, users, and routes return `404`
- **Non-functional checks** — response-time assertion in the Postman collection

## Two Approaches (and why both)

**Why include Postman/Newman *and* Playwright?** Because real QA teams rarely live in one tool, and each shines in a different situation:

- **Postman + Newman** — fast to author and share, readable by non-developers, great for exploratory testing and quick regression packs. Newman then runs the exact same collection headlessly in CI. This mirrors how many teams start their API testing.
- **Playwright `request` API** — code-first, version-friendly, and scales naturally with helpers, fixtures, and reusable schema utilities. It produces a rich HTML report and integrates cleanly with a broader JS/TS test estate.

Maintaining both against the same API demonstrates the ability to pick the right tool per context and to keep parallel suites in sync.

## Project Structure

```
api-test-automation/
├── .github/
│   └── workflows/
│       └── api-tests.yml                     # CI: runs Playwright + Newman, uploads reports
├── postman/
│   ├── JSONPlaceholder.postman_collection.json   # Postman Collection v2.1 (CRUD + users)
│   └── JSONPlaceholder.postman_environment.json  # baseUrl environment
├── tests/
│   ├── posts.spec.js                         # CRUD lifecycle for /posts
│   ├── users.spec.js                         # /users list + single user validation
│   └── negative.spec.js                      # 404 / not-found scenarios
├── utils/
│   └── schema.js                             # Lean, dependency-free shape helpers
├── playwright.config.js                      # testDir, baseURL, reporters
├── package.json
├── .gitignore
├── LICENSE                                   # MIT
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) **18 or newer** (`node -v`)
- npm (bundled with Node.js)

## Installation

```bash
# Clone the repository
git clone https://github.com/Hamxa-Khalid/api-test-automation.git
cd api-test-automation

# Install dependencies (Playwright + Newman)
npm install

# Download the Playwright test runner binaries (one-time)
npx playwright install
```

## Running Tests

### Playwright API suite

```bash
# Run the full suite (list + HTML reporters)
npm test

# Run with the concise list reporter only
npm run test:list
```

### Postman collection via Newman

```bash
npm run test:newman
```

This is equivalent to:

```bash
newman run postman/JSONPlaceholder.postman_collection.json \
  -e postman/JSONPlaceholder.postman_environment.json
```

You can also import `postman/JSONPlaceholder.postman_collection.json` and the environment file directly into the Postman app and run the collection with the Collection Runner.

### Viewing reports

```bash
# Open the Playwright HTML report after a run
npm run test:report
```

The Playwright HTML report is written to `playwright-report/`. In CI, both the Playwright report and a Newman JSON report are uploaded as downloadable build artifacts.

## CI/CD

Every push and pull request to `main` triggers the [`api-tests.yml`](./.github/workflows/api-tests.yml) workflow on `ubuntu-latest` with Node.js 20. It runs **two parallel jobs**:

1. **Playwright API Tests** — `npm ci`, install Playwright, run the suite, upload the HTML report.
2. **Newman (Postman) Tests** — `npm ci`, run the collection with Newman, upload the JSON report.

The status badge at the top of this README reflects the latest run.

## What This Demonstrates

This project is intended to show practical, job-relevant API QA skills:

- Designing a **complete API test plan** (happy path, edge cases, and negatives)
- Asserting on **status codes, response bodies, and data shape/schema**
- **Request chaining** and use of environment/collection variables
- Building **maintainable, readable** tests with small reusable helpers
- Working fluently in **both low-code (Postman/Newman) and code-first (Playwright)** toolchains
- Wiring tests into **CI/CD** with artifact reporting

## Author

**Muhammad Hamza Khalid** — Senior SQA Engineer

- LinkedIn: [linkedin.com/in/hamzakhalidqa](https://www.linkedin.com/in/hamzakhalidqa/)
- Email: [muhammadhamzaqae@gmail.com](mailto:muhammadhamzaqae@gmail.com)
- GitHub: [@Hamxa-Khalid](https://github.com/Hamxa-Khalid)

## License

Released under the [MIT License](./LICENSE).
