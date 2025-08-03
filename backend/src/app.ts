import express from 'express';
import usersRoutes from './routes/user.routes';
import surveyRoutes from './routes/surveys.routes';

const app = express();

// Middleware setup (example)
app.use(express.json());

// Define routes (example root route)
app.get('/', (req, res) => {
  res.send('Engagely Backend API Running!');
});

// Use user routes
app.use('/api/users', usersRoutes);

// Surveys routes
app.use('/api/surveys',surveyRoutes);

// Export the app for usage in index.ts or tests
export default app;
