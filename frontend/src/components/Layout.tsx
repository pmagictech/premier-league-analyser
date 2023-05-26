import Head from "next/head";
import Link from "next/link";

import { IMessageContext, Message } from "@src/context/MessageContext";
import { useContext } from "react";
import Modal from "./Modal";

export default function Layout({ siteTitle, desc, children }: any) {
  const { title, type, message, isOpen, closeMessage } = useContext(Message) as IMessageContext;

  return (
    <>
      <Head>
        <title>{siteTitle ?? "Goodreads | Meet your next favorite book"}</title>
        <meta
          name="description"
          content={
            desc ??
            "Find and read more books you'll love, and keep track of the books you want to read. Be part of the world's largest community of book lovers on Goodreads."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="sr-only">PREMIER LEAGUE ANALYSER</h1>
      <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
        <div className="container mx-auto p-3 sm:flex justify-between items-center">
          <Link href="/" className="font-bold text-lg text-blue-600">
            PREMIER LEAGUE ANALYSER
          </Link>
        </div>
      </header>
      {children}
      <Modal title={title} type={type} isOpen={isOpen} message={message} closeModal={closeMessage} />
    </>
  );
}
