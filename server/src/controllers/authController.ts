import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  res.send('hello register');
};

export const login = async (req: Request, res: Response) => {
  res.send('hello login');
};
