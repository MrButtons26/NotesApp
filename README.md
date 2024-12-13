# Notes App

The Notes App is a robust full-stack application engineered to deliver an extensive and personalized collection of notes. By leveraging the Personal API for comprehensive media data retrieval, the app provides users with detailed information . This platform integrates user authentication, advanced media exploration, and personalized bookmarking features, ensuring a seamless and engaging user experience.

## Deployment

- **Frontend:** :- https://adorable-stardust-725d66.netlify.app/
- **Backend:** :- https://notesapp-m984.onrender.com


## Features

- **User Authentication:** Utilizes JWT for secure login and registration, ensuring user data protection.
- **Notes:** Enables users to take  their favorite notes, creating a personalized list of favorites accessible at any time.
- **Real Time Updates:** Provides Real Time updates using websockets.

## Getting Started For Backend

### Backend Setup

1.  **Clone the Repository:** Start by cloning the EntertainmentAppBE repository to your local machine.

    ```sh
    git clone https://github.com/MrButtons26/NotesApp.git
    ```


2.  **Install Dependencies:** Install the necessary dependencies using npm.

    ```sh
    npm install
    ```

3.  **Configure Environment Variables:** Create a `.env` file based on the provided `.env.example` file. Provide your MongoDB URI and TMDB API key in the `.env` file.

    ```
    WSPORT="Network Port to provide accesibility to the WSserver."
    PORT= "Network Port to provide accesibility to the server."
    DATABASE_URL= "Mongodb connection string our url "
    JWT_SECRET= "Secret token for JWT for signing and veryfiying user"
    AUTHORIZATION="TMDB API authentication key"
    ```

4.  **Compile the tsc Files:** .

    ```sh
    tsc -b 
    ```
    
4.  **Start the Server:** Run the backend server.

    ```sh
    node dist/app.js
    ```



### Backned Technologies
- Node js 
- Express js
- WebSocket
- jsonwebtoken
- bcrypt
- MongoDB 
- Mongoose 
- dotenv
- cors
- axios
- validator

### Backend Project Structure

- **Controllers:** Contains logic for handling API requests.
- **Models:** Defines the schema for database collections.
- **Router:** API routes for handling requests to different endpoints.


## Getting Started For Frontend

### Frontend Setup

1. **Clone the Repository:** Start by cloning the EntertainmentAppFE repository to your local machine.

   ```sh
   https://github.com/MrButtons26/NotesApp.git
   ```
2. **Navigate to the Frontend Directory:** Move into the frontend directory of the project.

   ```sh
   cd vite-project
   ```
   
3. **Install Dependencies:** Install the necessary dependencies using npm.

   ```sh
   npm install
   ```

4. **Start the Application:** Run the frontend application.

   ```sh
   npm run dev
   ```

### Frontend Technologies 

- Vite
- HTML
- CSS
- Tailwind CSS
- React.js
- React Query
- Javascript
- React hook form
- React Router Dom
- React redux toolkit
- axios
  
### Frontend Project Structure

- **public:** Images and SVG.
- **services:** API requests to the backend .
- **components:** Reusable components for React.
- **Pages:** Pages for different Routes of the website.



## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

