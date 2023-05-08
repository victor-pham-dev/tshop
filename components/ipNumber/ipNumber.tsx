import React, { useState } from "react";

interface NumberInputProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

export default function NumberInput({
  value,
  min = 1,
  max,
  step = 1,
  onChange = () => {},
}: NumberInputProps) {
  const [currentValue, setCurrentValue] = useState(value);

  function increment() {
    const newValue = currentValue + step;
    if (max != undefined) {
      if (newValue <= max) {
        setCurrentValue(newValue);
        onChange(newValue);
      }
    }
  }

  function decrement() {
    const newValue = currentValue - step;
    if (newValue >= min) {
      setCurrentValue(newValue);
      onChange(newValue);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseFloat(event.target.value);
    if (max != undefined) {
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        setCurrentValue(newValue);
        onChange(newValue);
      }
    }
  }

  return (
    <div
      className="number-input"
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <button onClick={decrement} style={{ width: "20px", height: "30px" }}>
        -
      </button>
      <input
        type="number"
        value={currentValue}
        min={min}
        max={max}
        step={step}
        onChange={handleInputChange}
        style={{ textAlign: "center", height: "30px", width: "80px" }}
      />
      <button onClick={increment} style={{ width: "20px", height: "30px" }}>
        +
      </button>
    </div>
  );
}
