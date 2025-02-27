# Task Management Application

## Overview

This project is a Task Management Application built with React and TypeScript. It allows users to manage tasks across different statuses such as "To Do", "In Progress", and "Done".

## Features

- **Task Board**: View tasks categorized by their status.
- **Search Functionality**: Search for tasks within a project.
- **Task Metrics**: View metrics related to tasks.
- **Add Task Dialog**: Add new tasks to the board.
- **Filter Tasks**: Filter tasks based on different criteria.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Lucide-react**: A library for icons.
- **Next.js**: A React framework for server-side rendering and generating static websites.

## Project Structure

```
/src
  /components
    /task-board.tsx
    /task-column.tsx
    /task-metrics.tsx
    /add-task-dialog.tsx
    /ui
      /input.tsx
      /button.tsx
      /dialog.tsx
      ...
  /contexts
    /task-context.tsx
  ...
/public
  ...
/styles
  ...
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/adityakkpk/refined-assignment.git
   ```
2. Navigate to the project directory:
   ```sh
   cd task-management-application
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Lucide-react](https://lucide.dev/)
