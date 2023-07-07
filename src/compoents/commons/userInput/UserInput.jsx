import React from "react";
import { Input, Label } from "./userInput.style";

export default function UserInput({
  label,
  inputId,
  onChange,
  onBlur,
  maxLength,
  minLength,
  placeholder,
  type,
}) {
  return (
    <>
      <Label htmlFor={inputId} className="a11y-hidden">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        id={inputId}
        onBlur={onBlur}
        maxLength={maxLength}
        minLength={minLength}
      />
    </>
  );
}
