# Highcharts Academy

## Description

Welcome to the `Highcharts Academy` repository! This repository is designed to help you learn and explore the Highcharts library through a series of practical exercises located in the `exercises` folder.

The exercises will be automatically graded by GitHub Classroom.

- **Do not modify the tests** or any files outside the `/exercises` folder.
- After committing and pushing your changes to GitHub, the autograding process will automatically start.

Each exercise is self-contained, allowing you to learn at your own pace. Automated tests are provided for each exercise, which you can run also locally to verify your solutions.

Remember to carefully follow the guidelines in the `README.md` files for each task. Good luck!

## Repository Structure

- `exercises/` - This folder contains individual exercises. Each exercise is located in its own subfolder.
- `tests/` - This folder contains automated tests for each exercise.

## Requirements

To complete the exercises, you only need a web browser. However, if you wish to run the automated tests locally, you will need:

- Node.js (version 14 or newer)
- npm (Node Package Manager)

## Running Tests Locally

You can complete the exercises without any additional setup. However, if you want to verify your solution using the provided tests before submitting the exercises, you can run them locally.

1. Install the necessary dependencies:

    ```bash
    npm install
    ```

2. Run tests for a given task. Example for the exercise 00:

    ```bash
    npm run test-00
    ```

    Available commands:
    - `npm run test-{exercise-number}` - runs tests for the task with the given number (`00`, `01`, etc.)
    - `npm run test-all` - runs tests for all tasks at once

