import { Request, Response } from 'express';
import rconConnection from '../config/rconConfig';
import connection from '../config/mysqlConfig';
import { RowDataPacket } from 'mysql2';

export const addItems = async (req: Request, res: Response) => {
  try {
    const { command, detail } = req.body;

    const sql = 'INSERT INTO items (item_command, item_detail) VALUES (?, ?)';
    const [result] = await connection.query(sql, [command, detail]);
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
  try {
    await rconConnection.connect();
    const player = req.params.player;
    const itemId = req.params.itemId;

    const sql = `SELECT 
    TRIM(SUBSTRING_INDEX(item_command, ' Player', 1)) AS Action,
    'Player' AS Player,
    TRIM(SUBSTRING_INDEX(item_command, 'Player ', -1)) AS Item 
FROM 
    items
WHERE 
    item_command LIKE '%Player%' AND item_id = ?;`;

    const [result] = (await connection.query(sql, itemId)) as RowDataPacket[];
    res.status(200).json(result);

    const action = result[0].Action;
    const item = result[0].Item;

    const response = await rconConnection.send(`${action} ${player} ${item}`);

    await rconConnection.disconnect();
  } catch (error) {}
};
