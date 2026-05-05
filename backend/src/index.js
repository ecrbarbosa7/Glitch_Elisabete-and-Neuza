import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// rotas
import authRoutes from './routes/auth.routes.js';
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Servidor a correr');
});  

app.get('/', (req, res) => {
  res.send('API Glitch a funcionar');

});