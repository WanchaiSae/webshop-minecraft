import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

interface CustomRequest extends Request {
  user: any;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log(token);

  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(token, '1234', (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    (req as CustomRequest).user = user;
    next();
  });
};
