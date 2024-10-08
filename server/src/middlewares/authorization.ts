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

  if (!token) {
    res.sendStatus(403);
  }

  jwt.verify(token!, 'your_jwt_secret', (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    (req as CustomRequest).user = user;
    next();
  });
};
