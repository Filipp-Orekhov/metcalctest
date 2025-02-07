import React from "react";
import style from "./style.module.scss";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className={style.inputContainer}>
      <label>{label}</label>
      <input
        className="custom-input"
        type="text"
        inputMode="decimal"
        pattern="^\d*\.?\d*$"
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default InputField;