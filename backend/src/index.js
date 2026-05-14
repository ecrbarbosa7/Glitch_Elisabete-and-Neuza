import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from "./routes/movie.routes.js";
import connectDB from './config/db.js';

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.get('/', (req, res) => {
  res.send('API Glitch a funcionar');
});


app.listen(3000, () => {
  console.log('Servidor a correr na porta 3000');
});