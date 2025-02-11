# Quiz App

A simple and interactive quiz application built with React.js, utilizing local data to dynamically display questions, track user responses, and calculate scores. This project serves as a learning exercise in state management, event handling, and UI updates in React.
## Live Demo: [Quiz App](https://unique-quiz-app.surge.sh/)

## 🚀 Features

- 📝 Multiple-choice questions with real-time feedback.
- 🎨 Styled using regular CSS for a clean and simple design.
- 🔄 Ability to navigate between questions and view the final score.
- 🕒 Countdown timer for quiz start and per-question time limit.
- ✅ Answer validation with visual feedback (correct/wrong styling).
- ♻️ Reset functionality to retake the quiz.
- 📊 Score tracking and result messages at the end.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Styling:** CSS (Global Styles)
- **State Management:** useState, useEffect

## 📂 Project Structure

```
quiz-app/
│-- public/
│-- src/
│   ├── assets/
│   │   ├── data.js  # Quiz questions stored in a local file
│   ├── components/
│   │   ├── Quize.jsx  # Main quiz component
│   │   ├── Quize.css  # Styling for the quiz
│   ├── App.js  # Main app entry point
│   ├── index.js  # Renders the React app
│   ├── main.jsx  # Root component
│-- .gitignore
│-- package.json
│-- README.md
```

## 🎯 How It Works

1. The app starts with a countdown timer before the quiz begins.
2. Questions are displayed one by one, fetched from `data.js`.
3. Users select an answer, and feedback is provided immediately.
4. The "Next" button updates the state and loads the next question.
5. At the end, the total score is displayed with a final message.
6. Users can reset the quiz to try again.

## 📌 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/sh22o/quiz-app.git
   ```
2. Navigate to the project folder:
   ```sh
   cd quiz-app
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev 
   ```

## 📌 Deployment

To deploy the project:

```sh
npm run build
```






