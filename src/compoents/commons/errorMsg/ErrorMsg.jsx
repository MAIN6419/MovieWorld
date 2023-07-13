import React from "react";
import { Message } from "./ErrorMsg.style";

export default function ErrorMsg({ message, className }) {
  return <Message className={className}>{message}</Message>;
}

