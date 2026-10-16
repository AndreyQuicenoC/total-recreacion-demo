import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

type WithTooltipProps = {
  label: string;
  children: React.ReactElement;
  side?: React.ComponentProps<typeof TooltipContent>["side"];
};

/** Envuelve un control interactivo con tooltip accesible (WCAG: nombre perceptible). */
export function WithTooltip({ label, children, side = "top" }: WithTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} sideOffset={4}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
