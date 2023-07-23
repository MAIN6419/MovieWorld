import React from "react";
import { Input, Label, Wrapper } from "./userInput.style";

export default function UserInput({
  value,
  label_hidden,
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
    <Wrapper>
      <Label className={label_hidden ? "a11y-hidden" : ""}htmlFor={inputId} >{label}</Label>
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
    </Wrapper>
  );
}
