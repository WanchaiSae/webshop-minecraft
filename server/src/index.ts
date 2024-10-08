import { config } from 'dotenv';
config();

import configOptions from './utils/serverConfigs';

import express from 'express';

import authRoutes from './routes/auth';
import items from './routes/items';

const app = express();
app.use(express.json());

const PORT = configOptions.PORT;

// Routes
app.use('/user', authRoutes);
app.use('/items', items);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
