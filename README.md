# Description

A Document library built with MERN stack,The document library enables these different flows or implementations:

1. User uploads single/Multiple documents or images
2. User downloads single/Multiple files
3. User can share the files
4. User can delete a file

## The project uses the following technologies:

1. React for the frontend

- The frontend contain 4 components:
  - App
  - FileUpload
  - FileList
  - FileItem
- SCSS to style the components

2. Express and Node for the backend

- Routes:
  - \upload (Post request)
  - \geturl (Get request)
  - \getAllFiles (Get request)
  - \delete (Get request)
  - \download (Get request)

3. MongoDB for the database

### Language & Tools:

- Node
- Express
- React
- Mongoose
- MongoDB

# Getting Started

This project was bootstrapped with [Create React App].

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `node server.js`

\backend
to run the server and connect to the database.

### `npm install`

to install the dependencies.

# Ideas and proporsals to imporove the application

1. Create User defined pages.
2. Implement authorization and authentication for users.
3. Implement a Private share function using a token.
4. Add a search tab for documents
5. Users can choose if they want their document to be public or private.
