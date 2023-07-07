import { useState } from "react";

export const useValidationInput = (initialValue, reg, errorMsg) => {
  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState({ errorMsg: "", valid: false });

  const onChnageValue = (e) => {
    setValue(e.target.value.trim());
    validation(e.target.value.trim());
  };

  const validation = (value) => {
    if (reg.test(value)) {
      setValid({ errorMsg: "", valid: true });
    } else {
      setValid({ errorMsg, valid: false });
    }
  };

  return [value, valid, setValid, onChnageValue];
};
