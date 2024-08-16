import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/layout/Layout";
import UserProvider from "@/context/UserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProductsCart",
  description: "Products list",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <Layout>{children}</Layout>
        </UserProvider>
      </body>
    </html>
  );
}
