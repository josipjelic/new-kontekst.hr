import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import healthRouter from './routes/health.js';
import contactRouter from './routes/contact.js';
import questionnaireRouter from './routes/questionnaire.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

const nodeEnv = process.env.NODE_ENV || 'development';
if (nodeEnv !== 'test') {
  app.use(morgan(nodeEnv === 'production' ? 'combined' : 'dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: corsOrigin }));

const apiGeneralLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/health', healthRouter);

const apiRouter = express.Router();
apiRouter.use(contactRouter);
apiRouter.use(questionnaireRouter);
app.use('/api', apiGeneralLimiter, apiRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

export default app;
