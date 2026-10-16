import * as React from "react";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";

type Props = Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> & {
  value: number | undefined;
  onChange: (n: number | undefined) => void;
  min?: number;
  step?: number;
};

export function NumberInput({ value, onChange, className, placeholder = "0", ...rest }: Props) {
  return (
    <Input
      type="number"
      inputMode="decimal"
      placeholder={placeholder}
      value={value === undefined || Number.isNaN(value) ? "" : value}
      onChange={(e) => {
        const v = e.target.value;
        if (v === "") onChange(undefined);
        else onChange(Number(v));
      }}
      className={cn(
        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0",
        className,
      )}
      {...rest}
    />
  );
}
