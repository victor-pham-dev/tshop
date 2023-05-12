import React, { useState } from "react";

interface NumberInputProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled: Boolean;
}

export default function NumberInput({
  disabled,
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
      {!disabled && (
        <button
          onClick={decrement}
          style={{
            width: "20px",
            height: "30px",
            border: "1px solid black",
            borderRadius: "4px",
          }}
        >
          -
        </button>
      )}

      <input
        disabled={disabled ? true : false}
        type="number"
        value={currentValue}
        min={min}
        max={max}
        id="cart-input-number"
        step={step}
        onChange={handleInputChange}
        style={{
          textAlign: "center",
          height: "30px",
          width: "80px",
          border: "1px solid black",
          borderRadius: "4px",
        }}
      />
      {!disabled && (
        <button
          onClick={increment}
          style={{
            width: "20px",
            height: "30px",
            border: "1px solid black",
            borderRadius: "4px",
          }}
        >
          +
        </button>
      )}
    </div>
  );
}
