import { Request, Response } from 'express';
import rconConnection from '../config/rconConfig';
import connection from '../config/mysqlConfig';
import { RowDataPacket } from 'mysql2';

export const addItems = async (req: Request, res: Response) => {
  try {
    const { name, command, qty, price, description } = req.body;

    const sql =
      'INSERT INTO items (item_name, item_command, item_qty, item_price, item_description) VALUES (?, ?, ?, ?, ?)';
    const [result] = await connection.query(sql, [
      name,
      command,
      qty,
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
  try {
    // await rconConnection.connect();
    const player = req.params.player;
    const itemId = req.params.itemId;

//     const sql = `SELECT 
//     TRIM(SUBSTRING_INDEX(item_command, ' Player', 1)) AS Action,
//     'Player' AS Player,
//     IF(TRIM(SUBSTRING_INDEX(item_command, 'Player ', -1)) = item_command, '', 
//        TRIM(SUBSTRING_INDEX(item_command, 'Player ', -1))) AS Item,
//     item_qty
// FROM 
//     items
// WHERE 
//     item_command LIKE '%Player%' AND item_id = ?;`;

    const sql = `SELECT * FROM items WHERE item_id = ?;`;

    const [result] = (await connection.query(sql, itemId)) as RowDataPacket[];
    res.status(200).json(result);

    // const action = result[0].Action; // Command
    // const item = result[0].Item ? result[0].Item : ''; // Item แบบ give [Player] [item] ไม่ต้องใส่จำนวนให้ใส่ใน item_qty
    // const item_qty = result[0].item_qty ? result[0].item_qty : '';

    // เพิ่ม logic จะได้ไม่ต้องไปหนัก database
    // const exampleCommand = result[0].item_command;
    const exampleCommand = "give Player diamond"

    const word = exampleCommand.split(' ');
    // ['give', 'Player', 'diamond', '1']

    // const sql2 = `UPDATE users SET balance = balance - (SELECT price FROM items WHERE item_id = ?) WHERE user_username = ?`
    // const [results2] = (await connection.query(sql2, [itemId, player])) as RowDataPacket[]

    // const sql_checkItemId = `SELECT * FROM items WHERE item_id = ?`;
    // const [results_checkItemId] = (await connection.query(sql_checkItemId, [itemId])) as RowDataPacket[];
    // res.json(200).json(results_checkItemId)
    // console.log(results_checkItemId)

    // const response = await rconConnection.send(
    //   `${action} ${player} ${item} ${item_qty}`
    // );

    const count = result[0].item_qty

    console.log(`${word[0]} ${player} ${word[2]} ${result[0].item_qty}`);
    

    // await rconConnection.disconnect();
  } catch (error) {}
};
