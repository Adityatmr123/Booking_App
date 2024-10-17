# Sports Booking Application

## Overview
This project is a booking application developed as part of a Game Theory assignment at IIIT-A using the MERN stack (MongoDB, Express, React, Node.js). The application enables efficient management of sports bookings across multiple centers, with a focus on preventing double-booking.

## Features
- **Multiple Centers**: Access to various sports across different locations.
- **Diverse Sports Offerings**: Courts for sports like badminton, squash, and cricket.
- **Customer Reservations**: Secure available 60-minute time slots.
- **Operations Management**: Center managers can view and create bookings.
- **Double-Booking Prevention**: Ensures no overlapping bookings for the same court.

## Design Decisions
- **Schema Design**: Models for centers, courts, sports, and bookings, focusing on core functionalities.
- **Backend**: Node.js and Express APIs prevent double bookings. MongoDB is used for flexible data management.
- **Frontend**: Built with React for a user-friendly interface.

## Implementation
- **APIs**: View and create bookings with validation checks to avoid conflicts.
- **Error Handling**: Basic validation and feedback mechanisms to enhance reliability.

## Challenges
- **Double-Booking Prevention**: Implemented server-side checks for resource availability.
- **Time Constraints**: Prioritized core functionalities for a functional MVP.

## Future Improvements
- User Authentication (JWT/session management)
- Enhanced UI for better usability
- Booking analytics and notification features
- Payment integration for bookings

  ## Installation

To get started with Booking App, follow these steps:

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Adityatmr123/Booking_App.git
    cd Booking_App
    ```

2. Navigate to the `backend` directory and install dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGO=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```bash
    cd backend
    node server.js
    `

### Frontend Setup

1. Navigate to the `client` directory and install dependencies:
    ```bash
    cd ../frontend/user
    npm install
    ```

2. Start the frontend development server:
    ```bash
    npm run dev
    ```

## Usage

Once both the backend and frontend servers are running, open your browser and navigate to `http://localhost:5173` to access Booking App.
<img width="1470" alt="Screenshot 2024-10-17 at 12 33 49 PM" src="https://github.com/user-attachments/assets/48b3910d-782b-4882-acd5-cd1c1951e80f">
<img width="1470" alt="Screenshot 2024-10-17 at 12 34 07 PM" src="https://github.com/user-attachments/assets/a6e47885-8bd6-48ff-9229-90fda417efaa">
<img width="1470" alt="Screenshot 2024-10-17 at 12 34 14 PM" src="https://github.com/user-attachments/assets/5c887741-5772-4fc9-b3b0-480d2afd5dde">
<img width="1470" alt="Screenshot 2024-10-17 at 12 39 23 PM" src="https://github.com/user-attachments/assets/00d90da8-0e7b-4945-b1a6-8cde8b7e72e6">

<img width="1470" alt="Screenshot 2024-10-17 at 12 35 00 PM" src="https://github.com/user-attachments/assets/63ac1ac9-3157-429a-afb2-0249bc9d4ae7">



## Conclusion
This application serves as a complete full-stack solution for sports booking, focusing on usability and data integrity. Future enhancements aim to improve security, usability, and functionality.

