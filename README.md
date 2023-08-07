Welcome to the Shift Management App - Server Side repository! This project is a server-side REST API built with Node.js, Express, and MongoDB to manage users' shifts efficiently. It works in conjunction with the client-side application to provide a seamless shift management experience.

Overview
The Shift Management App's server-side is designed to handle various functionalities related to managing shifts. It allows users to create, update, and delete shifts, while also providing authentication and authorization using JSON Web Tokens (JWT). The app leverages MongoDB to store shift and user data, ensuring a scalable and efficient data management system.

Key Features
User Management: Create, update, and delete user accounts with authentication through JWT.
Shift Management: Add, update, and delete shifts, including shift details such as date, time, hourly wage, and location.
Comment System: Users can add comments to shifts for better communication and information sharing.
Permission Handling: The app manages user permissions, distinguishing between regular users and administrators.
Data Security: User data is securely stored and managed using MongoDB and encrypted with JWT.
Getting Started
Clone the repository to your local machine 
Install the required Node.js packages: npm install
Set up MongoDB and ensure it's running.
Start the server: npm start
Explore the API endpoints using Postman to manage shifts and users effectively.


Technologies Used
Node.js
Express
MongoDB
Postman
