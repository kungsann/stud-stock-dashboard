import "./globals.css";

export const metadata = {
  title: "STUD Stock Dashboard",
  description: "ระบบจัดการสต๊อก STUD สำหรับโครงการ ผลิต PO และขนส่ง",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
