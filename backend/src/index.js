import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js';
import seriesRoutes from'./routes/series.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/favorites', favoriteRoutes);

app.get('/', (req, res) => {
  res.send('API Glitch a funcionar');
});

app.listen(3000, () => {
  console.log('Servidor a correr na porta 3000');
});