# ToDo List

A feature-rich ToDo List application with a Kotlin + Spring Boot backend and a TypeScript + React frontend.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Create, update, and delete tasks
- Mark tasks as completed
- Filter tasks by status (active, completed)
- Responsive and user-friendly UI

## Technologies
### Backend
- Kotlin
- Spring Boot
- Spring Data JPA
- H2 (default) or PostgreSQL

### Frontend
- React
- TypeScript
- Vite
- CSS Modules

## Getting Started
### Prerequisites
- Java 11+
- Node.js 14+
- Yarn or npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Fernando-Tozato/ToDo.git
   ```
2. Start the backend:
   ```bash
   cd ToDo/backend
   ./mvnw spring-boot:run  # or ./gradlew bootRun
   ```
3. Start the frontend:
   ```bash
   cd ../frontend
   yarn install && yarn start  # or npm install && npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
ToDo/
├── backend/    # Kotlin + Spring Boot API
├── frontend/   # React + TypeScript App
└── README.md   # Project documentation
```

## Contributing
Contributions welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Author
Fernando Tozato