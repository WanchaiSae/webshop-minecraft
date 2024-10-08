import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../config/mysqlConfig';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      'INSERT INTO users (user_username, user_email, user_password) VALUES (?,?,?)';
    const [results] = await connection
      .promise()
      .query(sql, [username, email, hashedPassword]);
    res.status(201).json({ message: 'Register Successfully. ', results });
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  res.send('Login');
};
