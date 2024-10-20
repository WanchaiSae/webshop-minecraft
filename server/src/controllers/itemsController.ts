import { Request, Response } from 'express';
import rconConnection from '../config/rconConfig';
import connection from '../config/mysqlConfig';
import { RowDataPacket } from 'mysql2';

export const addItems = async (req: Request, res: Response) => {
  try {
    const { name, command, qty, price, description } = req.body;

    const sql =
      'INSERT INTO items (item_name, item_command, item_price, item_description) VALUES (?, ?, ?, ?)';
    const [result] = await connection.query(sql, [
      name,
      command,
      price,
      description,
    ]);
    res.status(201).json({ message: 'Added successfully', result });
    return;
  } catch (error) {
    console.error(error);
  }
};

export const listItems = async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM items';
  const [result] = (await connection.query(sql)) as RowDataPacket[];
  res.status(200).json(result);
  return;
};

export const listItem = async (req: Request, res: Response) => {
  const itemId = req.params.itemId;
  console.log(itemId);
  const sql = 'SELECT * FROM items WHERE item_id = ?';
  const [result] = (await connection.query(sql, [itemId])) as RowDataPacket[];
  res.status(200).json(result);
  return;
};

/* 
 ถ้าต้องการเพิ่มคำสั่งในเกม Minecraft ร่วมถึง Plugins ที่ใช้
 สามารถใช้ได้เลย เวลาเพิ่มคำสั่งลงฐานข้อมูล 
 เช่น คำสั่งในเกมเป็น /give [Player] diamond 1 ในที่นี้หมายถึงเสกเพชร 1 เม็ด
 เวลาเพิ่มในระบบฐานข้อมูลให้เพิ่มเป็น give Player diamond
 give = คำสั่ง จะใช้แบบอื่นก็ได้
 Player = * จำเป็นต้องใส่ เพราะระบบออกแบบมาให้รู้ว่า Player คนไหนคลิกและอยู่ในเกม
 diamond = ชื่อไอเทมในเกม
 จะใช้อย่างอื่นก็ได้เช่น head Player แบบนี้ก็ได้ เพราะระบบออกแบบไว้แล้ว
*/
export const getItemPlayer = async (req: Request, res: Response) => {

  async function updatedBalance(itemId: string, player: string) {
    const sqlUpdateBalance = `UPDATE users SET balance = balance - (SELECT item_price FROM items WHERE item_id = ?) WHERE user_username = ?`
    const [resultsUpdateBalance] = (await connection.query(sqlUpdateBalance, [itemId, player])) as RowDataPacket[]

  }

  try {
    await rconConnection.connect();
    const player = req.params.player;
    const itemId = req.params.itemId;
  

    const sql = `SELECT * FROM items WHERE item_id = ?;`;

    const [result] = (await connection.query(sql, itemId)) as RowDataPacket[];
    res.status(200).json(result);

    const cmd = result[0].item_command;
    const cmd_player = cmd.replace("Player", player)
    console.log(cmd_player);
    
    updatedBalance(itemId, player)

    console.log(`${cmd_player}`);

    const response = await rconConnection.send(
      `${cmd_player}`
    );

    await rconConnection.disconnect();
  } catch (error) {
    console.log(error);
  }
};

export const removeItem = async (req: Request, res: Response) => {
  const itemId = req.params.itemId;
  const sql = 'DELETE FROM items WHERE item_id = ?';
  const [result] = (await connection.query(sql, [itemId])) as RowDataPacket[];
  res.status(200).json(result);
}