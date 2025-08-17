# Student Analytics Dashboard

A modern, responsive web application built with React, TypeScript, and Material-UI (MUI) to visualize student and class performance data. It provides a clean, intuitive interface for educators and administrators to monitor attendance, emotional engagement, and overall status across multiple classes and for individual students.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)

---

## Features

### **Responsive Layout**

This feature ensures the application is usable and looks great on any device, from a large desktop monitor to a small mobile phone.

- **On Desktops:** You get a full-featured view with a permanently visible sidebar for easy navigation between pages.
- **On Mobile/Tablets:** The sidebar automatically hides and can be opened by tapping a "hamburger" menu icon in the header. This saves screen space and prevents the main content from feeling cramped.

### **Light & Dark Modes**

A user-experience feature that allows you to switch the application's color scheme.

- **Light Mode:** A standard, bright interface that's easy to read in well-lit environments.
- **Dark Mode:** A darker interface that reduces eye strain in low-light conditions.

### **Class Dashboard**

This page (`DashboardPage.tsx`) provides a high-level, comparative overview of all classes at once, designed for quickly identifying trends.

- **At-a-glance Comparison:** Bar charts place every class side-by-side to compare metrics like **Attendance Rate**.
- **Emotion Analysis:** A stacked bar chart shows the emotional temperature of each class, breaking down the distribution of positive, negative, and neutral emotions.

### **Student Dashboard**

This page (`StudentsPage.tsx`) is designed for deep dives into the performance of a single student.

- **Two-Pane View:** The screen is split into a searchable list of all students on the left and detailed analytics for the selected student on the right.
- **Detailed Breakdown:** See the student's overall attendance and a table listing every class they are in, showing their specific performance for each one.

### **Class Details Page**

This page (`ClassesPage.tsx`) focuses on a single class.

- **Class-Centric View:** Select a specific class from a searchable list on the left.
- **Detailed Roster:** The right-hand panel shows the overall statistics for that class and a detailed table listing every student in that class.

### **Live Data Integration**

The application actively communicates with a backend server to fetch and display up-to-date information, ensuring you're always looking at the most current analytics.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    This command starts the Vite development server.

    ```bash
    npm run dev
    ```

    Your application should now be running on `http://localhost:5173` (or the next available port).

4.  **Run the backend server:**
    Make sure your backend server is running on `http://localhost:8000` for the API calls to work correctly.

---

## Project Structure

```
src/
├── api/
│ ├── services/
│ │ ├── attendanceService.ts
│ │ ├── classService.ts
│ │ ├── emotionService.ts
│ │ └── studentService.ts
│ └── axiosConfig.ts
├── components/
│ ├── Layout.tsx
│ └── sideNav/
├── pages/
│ ├── DashboardPage.tsx
│ ├── StudentsPage.tsx
│ └── ClassesPage.tsx
├── types/
│ └── api.ts
├── main.tsx
└── theme.ts
```

---

## Technologies Used

- **Framework:** [React](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [Material-UI (MUI)](https://mui.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Charting:** [Recharts](https://recharts.org/)

---

## API Endpoints

The application consumes the following API endpoints from the backend server running on `http://localhost:8000`.

- `GET /api/attendance-status/`: Returns attendance rates for all classes.
- `GET /api/emotions-status/`: Returns emotion distributions for all classes.
- `GET /api/student-overall-status/`: Returns a summary of classes attended for each student.
- `GET /api/students-detail-status/`: Returns a detailed breakdown of performance for all students.
- `GET /api/class-detail-status/`: Returns a detailed breakdown of performance for all classes.
