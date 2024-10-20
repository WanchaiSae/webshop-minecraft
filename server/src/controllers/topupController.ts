import {config} from 'dotenv'
config()
import promptpay from 'promptpay-qr'
import qrcode from 'qrcode'
import { Request, Response } from 'express'
import { RowDataPacket } from 'mysql2'
import connection from '../config/mysqlConfig'

export const topup = async (req: Request, res: Response) => {
  const idAccept = process.env.PHONE_OR_IDCARD!
  // const mobileNumber = '000-000-0000' // format must be 000-000-0000
  // const cardId = '0-0000-00000-00-0' // '0-0000-00000-00-0'
  const amount = parseFloat(req.body.amount)
  const userId = req.body.userId

  const payload = promptpay(idAccept, {amount})

  const options = {
    color: {
      dark: '#000',
      light: '#fff'
    }
  }

  async function updateBalance(amount: number, userId: number) {
    const sql = `UPDATE users SET balance = balance + ? WHERE user_id = ?`
    const [result] = (await connection.query(sql, [amount, userId])) as RowDataPacket[]
    return result
  }

  // TOPUP GENERATE QRCODE
  qrcode.toDataURL(payload, options, (err, url) => {
    if(err) {
      console.log('generate fail')
      return res.status(400).json({message: 'generate fail'})
    }

    updateBalance(amount, userId)

    return res.status(200).json({url})
  })
  
}