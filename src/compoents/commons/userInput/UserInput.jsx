import React from "react";
import { Input, Label } from "./userInput.style";

export default function UserInput({
  value,
  label,
  inputId,
  onChange,
  onBlur,
  maxLength,
  minLength,
  placeholder,
  type,
  InputRef
}) {
  return (
    <>
      <Label htmlFor={inputId} className="a11y-hidden">{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        id={inputId}
        value={value}
        onBlur={onBlur}
        maxLength={maxLength}
        minLength={minLength}
        ref={InputRef}
      />
    </>
  );
}
