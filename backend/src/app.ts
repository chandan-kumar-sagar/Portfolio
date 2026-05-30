import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db';
import portfolioRoutes from './routes/portfolioRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Establish DB Connection
connectDB();

// 2. Middlewares
// Enable CORS for frontend requests
app.use(cors({
  origin: '*', // We allow all origins for developer portfolio accessibility
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 3. System Rate Limiting (Futuristic security shield)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'FIREWALL WARNING: Excess transmissions detected. Uplink throttled for 15 minutes.'
  }
});

// Apply rate limiter to API routes
app.use('/api', apiLimiter);

// 4. API Endpoints
app.use('/api/portfolio', portfolioRoutes);

// Main System Diagnostic Root Check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ONLINE',
    systemName: 'JARVIS-PORTFOLIO-MAINFRAME',
    diagnostics: 'ALL SYSTEMS NOMINAL',
    timestamp: new Date()
  });
});

// 5. Global Exception / Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[CRITICAL-FAULT] Global exception caught:', err);
  res.status(500).json({
    success: false,
    message: 'SYSTEM MALFUNCTION: An internal runtime anomaly was isolated and intercepted.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Mainframe Server
app.listen(PORT, () => {
  console.log(`
  ======================================================
     🤖 JARVIS PORTFOLIO SYSTEM ONLINE & NOMINAL 🤖
  ======================================================
     >> Mainframe Host: http://localhost:${PORT}
     >> Active Mode:   ${process.env.NODE_ENV || 'production'}
     >> Secure Shield: Enabled
     >> API Uplink:    /api/portfolio
  ======================================================
  `);
});
