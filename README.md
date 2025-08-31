# echoWrite - Modern Blogging Platform

A feature-rich blogging platform built with React, Vite, and Appwrite, featuring a modern UI with Tailwind CSS.

## Features

- 🔐 User Authentication (Login/Signup)
- 📝 Create, Edit, and Delete Blog Posts
- 📸 Image Upload Support
- 💫 Rich Text Editor
- 🌓 Light & Dark Mode Toggle
- 🎯 Status Management (Active/Inactive Posts)
- ⚡ Real-time Preview
- 📱 Responsive Design
- 🎨 Theme System with CSS Variables

## Tech Stack

- **Frontend Framework:** React + Vite
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Backend Service:** Appwrite
- **Form Handling:** React Hook Form
- **Rich Text Editor:** TinyMCE
- **Routing:** React Router DOM
- **Content Parsing:** html-react-parser

## Getting Started

1. Clone the repository
```bash
git clone [repository-url]
cd EchoWrite
```

2. Install dependencies
```bash
npm install
```

3. Configure Appwrite
- Create an Appwrite project
- Set up authentication, database, and storage services
- Create `.env` file with your Appwrite credentials:
```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
VITE_APPWRITE_BUCKET_ID=
```

4. Start development server
```bash
npm run dev
```

## Project Structure

```
src/
├── appwrite/        # Appwrite configuration and services
├── components/      # Reusable UI components
├── context/         # React context providers
├── docs/           # Documentation files
├── pages/          # Page components
├── store/          # Redux store configuration
├── styles/         # Global styles and theme variables
└── assets/         # Static assets
```

## Key Components

- **Authentication:** Full user authentication flow with protected routes
- **Post Management:** CRUD operations for blog posts
- **Image Handling:** Upload and preview functionality
- **Rich Text Editor:** Advanced content editing capabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
