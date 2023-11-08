import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/ui/global.css";
import ReactQuery from "@/lib/reactQuery";
import StyledComponentsRegistry from "@/lib/registry";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "동서남북",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQuery>
          <StyledComponentsRegistry>
            <main>{children}</main>
          </StyledComponentsRegistry>
        </ReactQuery>
      </body>
    </html>
  );
}
