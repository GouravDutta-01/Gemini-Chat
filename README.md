# Gemini-Chat

**Gemini-Chat** is a web-based chat application that integrates Google OAuth for authentication and uses Google's Gemini API to provide AI-generated responses. The application is built using Node.js, Express.js, and Passport.js for the backend, and HTML, CSS, JavaScript, and Bootstrap for the frontend.

## Features
- Google OAuth authentication
- Secure user session management
- AI-powered chat using **Gemini API**
- Simple UI with **Bootstrap styling**
- **Dark mode** support

## Installation

1. **Clone** the Repository
    ```bash
    git clone https://github.com/GouravDutta-01/Gemini-Chat.git
    ```
2. Navigate to the root directory of the project
    ```bash
    cd Gemini-Chat
    ```
3. **Navigate to the backend directory**  
    ```bash
    cd backend
    ```

4. **Create a `.env` file** inside the backend directory and add the following:  
    ```env
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GEMINI_API_KEY=your_gemini_api_key
    SESSION_SECRET=your_secure_random_string
    PORT=3000
    ```
    - Get **Google OAuth Credentials** from [Google Cloud Console](https://console.cloud.google.com/):  
      - Create a new project → "APIs & Services" → "Credentials" → Create **OAuth client ID**  
      - Add `http://localhost:3000/auth/google/callback` as an **authorized redirect URI**  
      - Copy the **Client ID** & **Client Secret**  
    - Get **Gemini API Key** from [Google AI Studio]()

5. **Install backend dependencies**  
    ```bash
    npm install
    ```

6. **Run the application**  
    ```bash
    npm start
    ```
    The backend will start at **[http://localhost:3000](http://localhost:3000)** and serve the frontend automatically.

---

Now, visit **[http://localhost:3000](http://localhost:3000)** to use the application.
