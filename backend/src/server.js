import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import taskRoutes from './routes/task.routes.js';

const app = express();

// Middlewares
app.use(helmet()); 
app.use(cors());
app.use(express.json());

// Rate Limiter Protect spam API
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit 100 request
});
app.use('/api', limiter);

app.use('/api/tasks', taskRoutes);

// Global Error Handler for Express v5
app.use((err, req, res, next) => {
  console.error('[Error]:', err.message);
  
  const statusCode = err.message === 'Task not found' ? 404 : 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
