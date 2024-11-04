# Quiz App API

This is a RESTful API for a quiz application built with Node.js, Express, and TypeScript. The application allows users to create quizzes, answer questions, and retrieve their quiz results.

## Features
- **Create Quiz**: Define a quiz with multiple-choice questions.
- **Submit Answer**: Submit answers to individual questions and receive feedback.
- **Get Results**: Retrieve scores and a summary of submitted answers.

## Technologies Used
- **Node.js** and **Express.js** for the backend.
- **TypeScript** for type safety.
- **Docker** for containerized deployment.

---

## Getting Started

### Prerequisites
- **Node.js** (v14+) and **npm** (for local setup)
- **Docker** (if you prefer running the app with Docker)

---

## Running the Application

### Option 1: Running Without Docker

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/quiz-app-api.git
   cd quiz-app-api

npm install

npm run build
npm start

### Option 2: Running With Docker
npm run build
docker-compose up --build
docker-compose down



## Create Quiz
    POST /api/quizzes
    Payload Example:
    {
    "title": "Sample Quiz",
    "questions": [
        {
        "text": "What is the capital of France?",
        "options": ["Berlin", "London", "Paris", "Madrid"],
        "correctOption": 2
        }
    ]
    }

## Get Quiz

    GET /api/quizzes/:quizId
    Fetches quiz details by ID (without showing correct answers).

## Submit Answer

    POST /api/quizzes/:quizId/answer
    Payload Example:
        {
        "questionId": "question_id_here",
        "selectedOption": 1,
        "userId": "user_123"
        }

## Get Results
GET /api/quizzes/:quizId/results/:userId
Retrieves the user’s quiz results, including score and summary.

        


