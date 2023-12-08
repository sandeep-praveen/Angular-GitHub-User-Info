# Angular GitHub User Info App

This is an Angular application that allows users to search for GitHub users by username and view their information, including repositories and languages used in their repositories.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [API Service](#api-service)
- [Acknowledgments](#acknowledgments)

## Getting Started

### Prerequisites
To run this project, you should have the following prerequisites:
- Node.js installed on your machine
- Angular CLI installed globally

### Installation
Follow these steps to get the project up and running:

1. Clone the repository:
   ```bash
   git clone https://github.com/sandeep-praveen/Angular-GitHub-User-Info-App.git
2. Navigate to the project directory:
   ```bash
   cd Angular-GitHub-User-Info-App
3. Install dependencies:
   ```bash
   npm install
4. Start the development server:
   ```bash
   ng serve

You can access the app in your web browser at http://localhost:4200/.

## Usage

This Angular app allows you to:

- Search for GitHub users by entering their username.
- View the user's information, including their avatar, GitHub profile link, name, bio, location, and Twitter link (if available).
- View a list of the user's public repositories, including the repository name, description, and languages used.

## Development

The project structure follows the standard Angular setup. The main application logic is contained in the `app` directory, with the main component being `app.component`. The SCSS styles are located in the `app.component.scss` file.

## API Service

The API service used to interact with the GitHub API is defined in `api.service.ts`. It includes the following functions:

- `getUser(githubUsername: string)`: This function fetches user information from the GitHub API based on the provided username.
- `getUserRepositories(username: string, page: number = 1, pageSize: number = 10)`: This function retrieves a list of the user's repositories, paginated with a default page size of 10.
- `getRepositoryLanguages(username: string, repo: string)`: This function retrieves the languages used in a specific repository.

## Acknowledgments

This project is built using Angular and makes use of the GitHub API to fetch user data and repository information. Special thanks to the Angular community for their support and contributions.
