import { ChangeEvent, FC, memo } from "react";
import styles from "./input.module.scss";
import { useAppSelector } from "../../hooks";

interface InputProps {
  value: string | number;
  min: number;
  max: number;
  step: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = memo(({ value, min, max, step, onChange }) => {
  const { light } = useAppSelector((state) => state.theme);
  return (
    <>
      <input className={styles.value} type="text" value={value} disabled />
      <input
        className={light ? styles.input : styles.inputDark}
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
