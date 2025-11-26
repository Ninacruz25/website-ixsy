import { Card, extendVariants } from "@heroui/react";
import { forwardRef } from "react";

export const CardRequirementExtended: any = extendVariants(Card, {
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

export type RequirementItem = {
  number: number;
  text: string;
};

export type CardRequirementProps = {
  requirement: RequirementItem;
  className?: string;
};

const CardRequirement = forwardRef<HTMLDivElement, CardRequirementProps>(
  function CardRequirement({ requirement, className = "" }, ref) {
    return (
      <CardRequirementExtended 
        ref={ref} 
        variant="default" 
        className={`${className}`}
      >
        <div className="p-8">
          <div className="text-white">
            <span className="text-teal-400 font-bold text-lg mr-2">
              {requirement.number}.
            </span>
            <span className="text-lg font-medium">
              {requirement.text}
            </span>
          </div>
        </div>
      </CardRequirementExtended>
    );
  }
);

export default CardRequirement;