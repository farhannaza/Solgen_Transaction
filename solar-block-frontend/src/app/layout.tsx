import React from 'react';
import LayoutApp from '@/components/layoutApp';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Solar",
    default: "Solar",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return(
  <html lang="en">
    <body className={inter.className}>
      <AntdRegistry>
        <LayoutApp>
          {children}
        </LayoutApp>
      </AntdRegistry>
    </body>
  </html>
  );
}

