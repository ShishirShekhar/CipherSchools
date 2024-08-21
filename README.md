# 📚 Test Environment Platform - Full-Stack Developer Assignment

This repository contains the source code for a Test Environment Platform developed as part of a Full-Stack Developer assignment. The platform enables students to take multiple-choice questions (MCQ) tests, with a focus on user authentication, test administration, and automated score evaluation.

## 🛠️ Technologies Used

- **Frontend**: React.js, CSS Modules, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT Authentication
- **Email Service**: Nodemailer
- **Cron Jobs**: node-cron

## 🚀 Features

### User Authentication

- Secure login system using email and password.
- Authentication is required to access the test environment.

### Test Environment

- **Permissions**: Requests access to the camera and microphone.
- **Live Preview**: Displays a live preview of the camera feed once permissions are granted.
- **Error Handling**: Displays an error message if permissions are not granted.

### MCQ Test Interface

- Users can view each question and its options.
- Users can select and change their answers.
- Navigation between questions is allowed.
- A camera window is displayed in the test interface.

### Test Submission and Evaluation

- Users can submit their test and are redirected to a "Finish Test" page.
- A cron job runs every hour to evaluate submitted tests and calculate scores.
- Scores are automatically sent to the user’s email using a predefined template.

## 📂 Project Structure

```bash
TestEnvironmentPlatform/
├── server/                # Backend code (Node.js, Express.js)
├── client/                # Frontend code (React.js)
├── public/                # Public assets (images, icons, etc.)
├── src/                   # Source code
│   ├── components/        # Reusable components
│   ├── pages/             # React pages
│   ├── styles/            # CSS Modules and global styles
│   ├── utils/             # Utility functions and helpers
│   ├── hooks/             # Custom React hooks
│   └── services/          # API service functions
├── .env.example           # Example environment variables
├── README.md              # Project README
├── package.json           # NPM package configuration
└── next.config.js         # Next.js configuration
```

## 🖥️ Installation and Setup

To set up the project locally, follow these steps:

### Prerequisites

- **Node.js** (v14.x or later)
- **MongoDB** (local or cloud)
- **Nodemailer Account** (for sending emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ShishirShekhar/CipherSchools.git
   cd CipherSchools
   ```

2. **Install dependencies for the server**

   ```bash
   cd server
   npm install
   ```

3. **Install dependencies for the client**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Rename the `.env.example` file in both `server` and `client` directories to `.env` and update the values accordingly.

   ```bash
   mv .env.example .env
   ```

### Running the Application

1. **Start the server**

   ```bash
   cd server
   npm run start
   ```

2. **Start the client**

   Open a new terminal window and run:

   ```bash
   cd client
   npm run dev
   ```

   The client application will be available at `http://localhost:3000`, and the server will run on the configured port.

### Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub.
2. Connect your GitHub repository to Vercel.
3. Set the necessary environment variables in Vercel.
4. Deploy the project using Vercel's CLI or web interface.

## 📝 Test Creation

A sample test has been created with 10 MCQ questions to demonstrate the platform’s functionality.

### Test User Credentials

- **Email**: `testuser@example.com`
- **Password**: `TestPassword123`

### Cron Job Evaluation

- The cron job runs every hour to evaluate the submitted tests and calculate scores.
- After evaluation, the user's score is sent via email using the template provided below.

### Email Template

```text
Subject: Your Test Results

Dear {{user.name}},

Congratulations on completing the test! Here are your results:

Score: {{score}}/10

Thank you for participating!

Best regards,
Test Environment Platform Team
```

### Example of Email Received

![Email Screenshot](https://user-images.githubusercontent.com/000000/00000000-0000-0000-0000-000000000000/email-screenshot.png) <!-- Replace with actual screenshot -->

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### Steps to Contribute

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

**Shishir Shekhar** - [LinkedIn](https://www.linkedin.com/in/shishir-shekhar/) - [Twitter](https://twitter.com/shishirshekhar0) - [Email](mailto:sspdav02@gmail.com)

Project Link: [https://github.com/ShishirShekhar/CipherSchools](https://github.com/ShishirShekhar/CipherSchools)
