import express from 'express';
import path from 'path';
import itemRoutes from './routes/itemRoutes';

const app = express();

app.use(express.json());

app.use('/api', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});