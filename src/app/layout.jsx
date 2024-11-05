
import React from "react";
import { Providers } from "@/store/providers";
import MyApp from './app';
import "./global.css";
import { UserProvider } from '@/app/context/UserContext';

export const metadata = {
  title: 'SafeTech',
  description: 'Lorem Ipsut Dollor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserProvider>
          <Providers>
            <MyApp>{children}</MyApp>
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}


