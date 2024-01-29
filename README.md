# Event Management System

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/alishatri/project-4
   ```

2. **Navigate to the project directory:**

   ```bash
   cd event-management-system
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

1. **Update the `.env.example` file to `.env` file with your configuration settings, including database connection details.**

## Database Setup

1. **Ensure MySQL is installed and running.**

2. **Run Prisma migrations:**

   ```bash
   npx prisma migrate dev
   ```

## Running the App

1. Start the application in development mode:

```bash
npm run start
```

## Running the App (Continued)

2. **Access the API Endpoints:**

   - Open your browser or use a tool like [Postman](https://www.postman.com/) to interact with the API.

   - Base URL: `http://localhost:3000` (or your specified port)

3. **API Endpoints:**

   ### Events

   - **Create Event:**

     - Endpoint: `POST /create` , `Create a new Event`

   - **Get Event by ID:**

     - Endpoint: `GET /get-event/:id` , `Get Specific event`

   - **Get All Events:**

     - Endpoint: `GET /get-events` , `Get all events`

   - **Update Event:**

     - Endpoint: `PUT /update/:id` , `Update Event`

   - **Delete Event:**

     - Endpoint: `DELETE /delete/:id` , `Delete Event`

   - **Delete Event Registration:**
     - Endpoint: `DELETE /delete-member` , `Delete specific member from event`

   ### Registrations

   - **Create Registration:**

     - Endpoint: `POST /create`, `Create a new Registration`

   - **Get Registration by EMAIL:**

     - Endpoint: `GET /get-registration`, `Create registration by Email`

   - **Get All Registrations:**

     - Endpoint: `GET /get-registrations`, `Create all Registrations`

   - **Update Registration:**

     - Endpoint: `PUT /update/:id`, `Update Registration`

   - **Delete Registration:**
     - Endpoint: `DELETE /delete/:id`, `Delete registration by ID`

Thank you for using the Event Management System!
