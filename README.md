Playwright + TypeScript Automation Project

A practice project that automates UI, API and BDD tests with Playwright + TypeScript, applying Object-Oriented Programming, the Page Object Model and good design practices (SOLID, DRY and KISS).

Important note about the .env files

The .env.qa and .env.staging files are included in this repository on purpose, only to make the project easier to review: the mentor can validate the per-environment configuration without having to create the files manually.

They contain only public URLs and the test credentials published by the demo sites themselves.
They do not contain any personal or sensitive data.
It is understood that, as a good practice, .env files should never be committed to a repository. In a real project they would be listed in .gitignore, and only a .env.example without values would be shared.
Goals of the project
Model a small domain with classes, constructors, encapsulation, inheritance, polymorphism and static members.
Automate the UI with Playwright using a Page Object Model, fixtures, hooks and custom assertions.
Automate an API with GET and POST tests, schema validation and negative cases.
Write a BDD scenario in Gherkin connected to the same Page Objects.
Use per-environment configuration, external data (JSON/TypeScript) and parameterized tests.
Run on Chromium, Firefox and WebKit and produce failure artifacts and reports.

Applications under test
Type	Site
UI	https://opensource-demo.orangehrmlive.com/
API	https://restful-booker.herokuapp.com/

What is tested
UI: valid and invalid login (data-driven from JSON), filtering users by role (dropdown) and selecting a table row (checkbox).
API: creating bookings (POST with a JSON body, parameterized), reading them (GET), authentication and negative cases (404 and 403).
BDD: one Gherkin scenario that filters users by role.
Unit: tests for the OOP model (User, AdminUser, EssUser).

Project structure
configs/    Per-environment configuration and constants
domain/     OOP model (User, AdminUser, EssUser)
pom/        Page Object Model (elements/ and pages/)
api/        API clients and typed models
tests/      ui/, api/, unit/, fixtures/ and data/
features/   Gherkin files (.feature)
steps/      BDD step definitions
utils/      Shared helpers
