import Header from "@/components/Header";
import "./globals.css";
import Providers from "@/app/Providers";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "MovieFlix",
  description: "By Sarath",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Providers>
          <Header />
          <Navbar />
          <main>{children}</main>
          </Providers>
      </body>
    </html>
  );
}