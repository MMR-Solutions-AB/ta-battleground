import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";

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
      <Navbar />
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}

// const MyApp: AppType<AppPropsWithLayout & { session: Session | null }> = ({
//   Component,
//   pageProps: { session, ...pageProps },
// }) => {
//   return (
//     <SessionProvider session={session}>
//       <Navbar />
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// };

export default trpc.withTRPC(MyApp);
