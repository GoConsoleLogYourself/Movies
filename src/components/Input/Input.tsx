import { ChangeEvent, FC, memo } from "react";
import styles from "./input.module.scss";

interface InputProps {
  value: string | number;
  min: number;
  max: number;
  step: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = memo(({ value, min, max, step, onChange }) => {
  return (
    <>
      <input className={styles.value} type="text" value={value} disabled />
      <input
        className={styles.input}
        type="range"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
      />
    </>
  );
});

export default Input;
