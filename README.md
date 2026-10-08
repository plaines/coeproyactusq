# Playwright + TypeScript Automation Project

A practice project that automates **UI, API, BDD and Unit Tests** using **Playwright + TypeScript**, applying:

- Object-Oriented Programming (OOP)
- Page Object Model (POM)
- SOLID Principles
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple)

---

## Project Goals

This project demonstrates how to:

Model a domain using classes, inheritance, polymorphism and encapsulation.

Automate UI testing using:
- Playwright
- Page Object Model
- Fixtures
- Hooks
- Custom Assertions

Automate API testing with:
- GET and POST requests
- Schema validation
- Positive and negative scenarios

Implement BDD with:
- Gherkin
- Feature files
- Step Definitions
- Reusable Page Objects

Use:
- Environment-based configuration
- External test data (JSON / TypeScript)
- Parameterized tests

Execute tests on:
- Chromium
- Firefox
- WebKit

Generate:
- Reports
- Screenshots
- Videos
- Traces on failure

---

## Applications Under Test

### UI Application

https://opensource-demo.orangehrmlive.com/

### API Application

https://restful-booker.herokuapp.com/

---

## Test Coverage

### UI Tests

- Valid Login
- Invalid Login
- Data-driven login tests from JSON
- Filter users by role
- Select table rows using checkboxes

### API Tests

- Create Booking (POST)
- Get Booking (GET)
- Authentication
- Schema Validation
- Negative Scenarios
  - 404 Not Found
  - 403 Forbidden

### BDD Tests

- Gherkin scenario for filtering users by role

### Unit Tests

- `User`
- `AdminUser`
- `EssUser`

---

## 📂 Project Structure

```text
project-root/
│
├── configs/          # Environment configuration and constants
├── domain/           # OOP model (User, AdminUser, EssUser)
├── pom/
│   ├── elements/     # Page elements
│   └── pages/        # Page Objects
│
├── api/              # API clients and models
│
├── tests/
│   ├── ui/
│   ├── api/
│   ├── unit/
│   ├── fixtures/
│   └── data/
│
├── features/         # Gherkin feature files
├── steps/            # BDD step definitions
├── utils/            # Shared utilities
│
├── playwright.config.ts
└── package.json
```

---

## Environment Configuration

The project supports multiple execution environments:

- QA
- Staging

Configuration is managed through environment files:

```text
.env.qa
.env.staging
```

---

## Important Note About `.env` Files

The `.env.qa` and `.env.staging` files are intentionally included in this repository to simplify project review.

These files contain only:

- Public URLs
- Test credentials provided by the demo applications

They do **not** contain:

- Personal information
- Sensitive data
- Production credentials

In a real-world project, `.env` files should never be committed to source control. Instead:

```text
.env.example
```

would be shared and the real environment files would be excluded through:

```text
.gitignore
```

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Faker
- Cucumber / 
