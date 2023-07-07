import React from "react";
import { Message } from "./ErrorMsg.style";

export default function ErrorMsg({ message }) {
  return <Message>{message}</Message>;
}

