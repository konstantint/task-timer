# Task Timer Application

A single-page web application for tracking time spent on various tasks.

## Project Structure

The project is structured as follows:

-   `/public`: Contains static assets, including the main `index.html` template.
-   `/src`: Contains all the React application source code, including components, hooks, and types.
-   `/dist`: This directory is created by the build process and contains the compiled, optimized application files ready for deployment.
-   `README.md`: This file.
-   `task-timer.spec.md`: The detailed specification for the application.

## Development Workflow

This project uses [Vite](https://vitejs.dev/) as its build tool.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18 or higher recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Installation

First, clone the repository and install the required dependencies:

```bash
npm install
```

### 2. Running the Development Server

To start the local development server with hot-reloading, run the following command:

```bash
npm run dev
```

This will open the application in your default browser, typically at `http://localhost:5173`. Any changes you make to the source code will be reflected in the browser immediately.

### 3. Building for Production

When you are ready to deploy the application, you need to create a production build. This process compiles and optimizes the code for the best performance.

Run the build command:

```bash
npm run build
```

This command will generate the final application files in the `dist/` directory. You can then serve the contents of this directory with any static file server.

### 4. Previewing the Production Build

To test the production build locally before deploying, you can use the `preview` command:

```bash
npm run preview
```

This will start a simple static server that serves the files from the `dist/` directory.
