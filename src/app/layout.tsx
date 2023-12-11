import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import Recoil from "@/lib/recoilRoot";
import ReactQuery from "@/lib/reactQuery";
import StyledComponentsRegistry from "@/lib/registry";

import TokenCheck from "@/components/templates/TokenCheck";

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
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3198965690400018"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body className={inter.className}>
        <ReactQuery>
          <StyledComponentsRegistry>
            <Recoil>
              <TokenCheck>
                <main className="w-full bg-white">{children}</main>
              </TokenCheck>
            </Recoil>
          </StyledComponentsRegistry>
        </ReactQuery>
      </body>
    </html>
  );
}
