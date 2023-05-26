import MessageContext from "@src/context/MessageContext";
import "@src/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MessageContext>
      <Component {...pageProps} />
    </MessageContext>
  );
}
