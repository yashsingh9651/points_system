import "./globals.css";
import { StickyNavbar } from "@/components/Navbar";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Akanksha Enterprises",
  description: "Your Bussiness Points is now in your pocket",
};

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body
          suppressHydrationWarning={true}
          className="font-Ubuntu scroll-smooth w-screen overflow-x-hidden"
        >
          <Toaster />
          <StickyNavbar />
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
