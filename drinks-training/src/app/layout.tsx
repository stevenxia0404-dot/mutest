import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "饮品制作培训",
  description: "互动式饮品制作培训课件",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
