# Event Management System

## Installation

1. **Clone the repository:**

    git clone https://github.com/alishatri/project-4

2. **Navigate to the project directory:**

    ```
    cd event-management-system
    ```

3. **Install dependencies:**

    ```
    npm install
    ```

## Configuration

1. **Copy the `.env.example` file:**

    ```
    cp .env.example .env
    ```

2. **Update the `.env` file with your configuration settings, including database connection details.**

## Database Setup

1. **Ensure MySQL is installed and running.**

2. **Run Prisma migrations:**

    ```bash
    npx prisma migrate dev
    ```

## Running the App

Start the application in development mode:

```bash
npm run start
