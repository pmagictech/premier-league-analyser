import { createContext, useState } from "react";

type TMessageType = "modal" | "toast";
type TOpenMessage = (title: string, message: JSX.Element | string, type?: TMessageType) => Promise<void>;

export interface IMessageContext {
  title: string;
  type: TMessageType;
  message?: JSX.Element | string;
  isOpen: boolean;
  openMessage: TOpenMessage;
  closeMessage: () => void
}

export const Message = createContext<IMessageContext | null>(null);

export default function MessageContext({ children }: { children: JSX.Element }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<TMessageType>("modal");
  const [message, setMessage] = useState<JSX.Element | string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [closeSignal, setCloseSignal] = useState(() => () => {});

  const closeMessage = () => {
    setIsOpen(false);
    closeSignal();
    setCloseSignal(() => () => {})
  }

  const openMessage: TOpenMessage = (title, message, type = "modal") => {
    setTitle(title);
    setType(type);
    setMessage(message);
    setIsOpen(true);

    return new Promise<void>((resolve) => {
      if (type == "toast")
        setTimeout(() => {
          setIsOpen(false);
          resolve();
        }, 40000);
      else
        setCloseSignal(() => resolve);
    });
  };

  return <Message.Provider value={{ title, type, message, isOpen, openMessage, closeMessage }}>{children}</Message.Provider>;
}
