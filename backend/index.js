require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

require("./config/passport"); 

const app = express();
app.use(express.json());
app.use(cors()); 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 3600000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Import and use routes
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

// Serve frontend files
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
