# STUD Stock Dashboard

Next.js dashboard สำหรับจัดการงาน STUD:

- สต๊อกแยกตามความสูง 10, 13, 15, 17, 18, 20, 23, 25, 30 CM
- งานปิดขายแบบโครงการที่มีหลายไซร์
- สรุป PO วัตถุดิบจากต่างประเทศ
- ตรวจนับก่อนนำเข้าสต๊อก
- ผลิตแล้ว / ยังไม่ผลิต / ออกของแล้ว / ค้างส่ง

## Run locally

```bash
npm install
npm run dev
```

เปิดที่ `http://localhost:3000`

## Deploy to Vercel

1. Push โฟลเดอร์นี้ขึ้น GitHub
2. เข้า Vercel แล้วเลือก `Add New Project`
3. Import repository นี้
4. Framework preset เลือก `Next.js`
5. กด Deploy

Vercel จะใช้คำสั่ง build จาก `package.json` อัตโนมัติ:

```bash
npm run build
```
