import promptpay from 'promptpay-qr'
import qrcode from 'qrcode'
import { Request, Response } from 'express'
import { RowDataPacket } from 'mysql2'

export const topup = async (req: Request, res: Response) => {
  const mobileNumber = '000-000-0000' // format must be 000-000-0000
  const amount = parseFloat(req.body.amount)
  console.log(amount);
  

  const payload = promptpay(mobileNumber, {amount})

  const options = {
    color: {
      dark: '#000',
      light: '#fff'
    }
  }

  qrcode.toDataURL(payload, options, (err, url) => {
    if(err) {
      console.log('generate fail')
      return res.status(400).json({message: 'generate fail'})
    }

    return res.status(200).json({url})
  })

}