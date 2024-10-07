import { config } from 'dotenv';
config();

import configOptions from './utils/serverConfigs';

import express from 'express';
const app = express();

const PORT = configOptions.PORT;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
