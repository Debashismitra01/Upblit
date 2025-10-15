import type { Metadata } from "next";
import { jetbrainsMono, montserrat, spaceGrotesk, cubano } from './fonts';
import "./globals.css";
import Footer from "./component/footer/footer";

export const metadata: Metadata = {
  title: "Upblit",
  description: "Upblit is an open-source auto-deployment and build orchestration system — built to simplify modern fullstack deployment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${montserrat.variable} ${spaceGrotesk.variable} ${cubano.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
