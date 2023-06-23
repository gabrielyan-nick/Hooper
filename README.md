# Hooper MERN project

Hooper is a web application built on the MERN stack, designed to help users find sports playgrounds (such as football or basketball courts) and connect with other players for games. The core feature of the application is a map that displays marked playgrounds, and clicking on a marker opens a popup window with detailed information and photos of the playground. Each playground has its own chat feature, implemented using Socket.io. Additionally, the application includes a list of players who have checked in at a particular playground.

[Deploy on Firebase](https://hooper-13.web.app/)

**Features**

- User registration and authentication
- Adding and editing playgrounds on the map
- Uploading photos for playgrounds and user avatars
- Communication via chat for each playground, powered by Socket.io
- Viewing the list of players at a playground
- Check-in functionality for users to indicate their presence at a playground
- User profile management

**Technologies Used**

*Frontend:*
- React.js
- Styled components
- Redux Toolkit, RTK Query
- Mapbox GL JS
- React Transition Group

*Backend:*
- Node.js
- Express.js
- MongoDB
- Mongoose

*Other tools and libraries:*
- React hook form
- Redux persist
- Socket.io
- JSON Web Tokens
- Agenda (for scheduling tasks)
- Firebase (for image storage)
- Nodemailer

