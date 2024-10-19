import { Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connection from '../config/mysqlConfig';
import { RowDataPacket } from 'mysql2';
import { config } from 'dotenv';
config();

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const check_user = 'SELECT * FROM users WHERE user_username = ?';

    const [checkResult] = (await connection.query(check_user, [
      username,
    ])) as RowDataPacket[];

    if (checkResult.length > 0) {
      res.status(400).json({ message: 'Username Already Exists.', status: false });
      return;
    }

    const check_email = 'SELECT * FROM users WHERE user_email = ?';

    const [emailResult] = (await connection.query(check_email, [
      email,
    ])) as RowDataPacket[];

    if (emailResult.length > 0) {
      res.status(400).json({ message: 'Email Already Exists.', status: false});
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      'INSERT INTO users (user_username, user_email, user_password, balance) VALUES (?,?,?, ?)';
    const [results] = await connection.query(sql, [
      username,
      email,
      hashedPassword,
      0,
    ]);

    res.status(201).json({ message: 'Register Successfully. ', results });
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE user_email = ?';
    const [results] = (await connection.query(sql, [email])) as RowDataPacket[];

    if (results.length === 0) {
      res.status(401).json({ message: 'Invalid email or password' , status: false});
      return;
    }

    const user = results[0];

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.user_password
    );

    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'Invalid email or password' , status: false});
      return;
    }

    const payload = {
      user_id: user.user_id,
    };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });
    res.setHeader('Authorization', `Bearer ${token}`);
    

    res.status(200).json({ message: 'Login successfully', token });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
};

export const getUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const sql = 'SELECT user_username, user_email, balance FROM users WHERE user_id = ?';
    const [results] = (await connection.query(sql, [userId])) as RowDataPacket[];

    if (results.length === 0) { 
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(results[0]);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
}