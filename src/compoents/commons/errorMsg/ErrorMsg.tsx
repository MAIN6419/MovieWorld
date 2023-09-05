import React from "react";
import { Message } from "./ErrorMsg.style";

interface IProps {
  message: string;
  className?: string;
}

export default function ErrorMsg({ message, className }: IProps) {
  return <Message className={className}>{message}</Message>;
}
