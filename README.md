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

## Conclusion
This application serves as a complete full-stack solution for sports booking, focusing on usability and data integrity. Future enhancements aim to improve security, usability, and functionality.
