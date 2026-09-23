import express from "express";
import cors from "cors";
import router from "./src/route/route.js";

const app = express();

// Middleware dasar 
app.use(cors());
app.use(express.json());

// Route generate contract 
app.use('/api/kontrak', router);

// Health Check API 
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API works'
  });
});

// Fallback
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'API error'
  });
});

export default app;
