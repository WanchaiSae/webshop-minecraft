import { config } from 'dotenv';
config();

interface ConfigOptions {
  PORT: number;
}

const configOptions: ConfigOptions = {
  PORT: Number(process.env.PORT),
};

export default configOptions;
