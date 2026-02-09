require("dotenv").config();
const express=require("express");
const cors = require("cors")
const path = require("path")
const connectDB = require('./config/db')
const authRoutes = require('../backend/routes/authRoutes')
const sessionRoutes = require('../backend/routes/sessionRoutes')
const questionRoutes = require('../backend/routes/questionRoutes')
const { protect } = require("../backend/middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("../backend/controllers/aiController");

const app=express();
connectDB()

//middleware to handle CORS
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);
// handle preflight requests
app.options("*", cors());

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);
app.use('/api/session',sessionRoutes)
app.use('/api/questions',questionRoutes)
app.use("/api/ai/generate-questions",protect,generateInterviewQuestions)
app.use("/api/ai/generate-explanation",protect,generateConceptExplanation)

//Serve uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));
//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server runnning on port ${PORT}`))
