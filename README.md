# webshop-minecraft

โปรเจกต์นี้ทำขึ่นมาเพื่อเป็นไอเดียในการต่อยอดของการทำเว็บซื้อไอเทมในเกม Minecraft

สามารถนำไปประยุกต์ใช้ได้ หรือนำไปเป็นกรณีศึกษาได้เช่นเดียวกัน
โปรเจกต์นี้ไม่ได้หวังอะไรมาก ขอแค่กำลังใจก็พอ ด้วยการกด Star หรือ Fork

## ก่อนเริ่มใช้งานโปรเจกต์

สิ่งที่ต้องมีคือ NodeJS ในเครื่อง MySQL ในเครื่อง เซิร์ฟเกม Minecraft และความรู้ในการเขียนโค้ดสักนิดนึงในการใช้งานโปรเจกต์นี้.
หวังว่าจะใช้งานได้ด้วยดี และสามารถนำไปพัฒนาต่อยอดจนเกิดประโยชน์อันสูงสุดได้

### เทคโนโลยีและเครื่องมือที่ใช้พัฒนาหลัก ๆ

ตามลิ้งนี้เลย 
- [NodeJS](https://nodejs.org/en)
- [Laragon](https://laragon.org/)
- [Typescript](https://www.typescriptlang.org/)
- [ExpressJS](https://www.npmjs.com/package/express)
- [@scriptserver/core](https://www.npmjs.com/package/@scriptserver/core)
- [promptpay-qr](https://www.npmjs.com/package/promptpay-qr)
- [tailwindcss](https://tailwindcss.com/)
- [ReactJS](https://react.dev/)
- [MySQL2](https://www.npmjs.com/package/mysql2)

### การนำไฟล์ sql เข้าไป
- นำไฟล์ webshop_minecraft.sql ใส่เข้าใน import แล้วกด OK

### การใช้งานโปรเจกต์

คำสั่งนี้สามารถใช้ได้ทั้งโฟล์เดอร์ Server และ Client

ติดตั้ง Package ด้วยคำสั่ง:

    npm i

Package ก็จะถูกติดตั้งและจะมีไฟล์ Module ขึ้นมา

## การเปิดเซิร์ฟของ Server และ Client

การรันด้วยคำสั่งนี้ จะเป็นการรันในโหมดของผู้พัฒนา

### เป็นการรันเซิร์ฟเวอร์ของโฟล์เดอร์ Server และ Client

เปิดการรันด้วยโหมดผู้พัฒนา สามารถใช้คำสั่งนี้แล้วไปพิมพ์ใน Server และ Client ได้เลย

    npm run dev

## วิธีนำไปใช้งานจริง

ในฝั่งของ Client

    npm run build

การรัน

    npm run preview

ในฝั่งของ Server

    npm run start

## วัตถุประสงค์ในการพัฒนาโปรเจกต์นี้

  - เพิ่มพูนทักษะของตัวเอง
  - เรียนรู้การแก้ปัญหา

