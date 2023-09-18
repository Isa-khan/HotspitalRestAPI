# Hospital Management System

This is a simple Hospital Management System built using Node.js and Express. It allows you to manage patient information and their medical records. You can perform the following operations:

- Get a patient's medical records.
- Create a new patient.
- Update existing patient information, specifically their phone number.
- Delete a patient's record.

## Prerequisites

Before you can run this project, make sure you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)

## Installation


# Clone the repository to your local machine
git clone <repository-url>

# Navigate to the project directory
cd hospital-management-system

# Install the required dependencies
npm install


## Usage
To start the server and use the Hospital Management System, run the following command:

bash
Copy code
node app.js




API Endpoints
Get Patient's Medical Records
Endpoint: /records
Method: GET
Headers:
ssn (Social Security Number) - The patient's SSN.
firstname - The patient's first name.
lastname - The patient's last name.
Request Body: None
Response: Returns the patient's medical records.
