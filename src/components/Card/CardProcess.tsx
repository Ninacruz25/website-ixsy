import { Card, extendVariants } from "@heroui/react";
import { forwardRef } from "react";

export const CardProcessExtended: any = extendVariants(Card, {
  variants: {
    variant: {
      default: {
        base: [
          "bg-gray backdrop-blur-sm",
          "border border-gray-700/50",
          "hover:border-teal-500/50",
          "transition-all duration-300",
          "hover:transform hover:scale-105",
        ],
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ProcessStep = {
  number: number;
  text: string;
};

export type CardProcessProps = {
  step: ProcessStep;
  className?: string;
};

const CardProcess = forwardRef<HTMLDivElement, CardProcessProps>(
  function CardProcess({ step, className = "" }, ref) {
    return (
      <CardProcessExtended 
        ref={ref} 
        variant="default" 
        className={`${className}`}
      >
        <div className="p-6">
          <div className="text-white">
            <div className="text-teal-400 font-bold text-lg mb-3">
              {step.number}.
            </div>
            <p className="text-sm leading-relaxed">
              {step.text}
            </p>
          </div>
        </div>
      </CardProcessExtended>
    );
  }
);

export default CardProcess;