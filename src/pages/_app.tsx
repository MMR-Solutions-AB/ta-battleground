import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { trpc } from "../utils/trpc";
import "../styles/globals.scss";
import Head from "next/head";
import { EditorProvider } from "@/context/EditorContext";
import { ModalProvider } from "@/context/ModalContext";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
} & { pageProps: { session: Session | null } };

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Battleground</title>
        <meta
          name="description"
          content="Platform för att träna på sina Javascript kunskaper"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <EditorProvider>
        <ModalProvider>
          <div className="grid min-h-screen grid-rows-[auto_1fr]">
            <Navbar />
            {getLayout(<Component {...pageProps} />)}
          </div>
        </ModalProvider>
      </EditorProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
