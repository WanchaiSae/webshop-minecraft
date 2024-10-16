import { config } from 'dotenv';
config();

import configOptions from './utils/serverConfigs';

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth';
import items from './routes/items';

const app = express();
app.use(express.json());
app.use(cors())

const PORT = configOptions.PORT || 5000;

// Routes
app.use('/user', authRoutes);
app.use('/items', items);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
