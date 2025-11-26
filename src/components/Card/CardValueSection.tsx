import { Card, extendVariants } from "@heroui/react";
import { forwardRef } from "react";

export const CardValueExtended: any = extendVariants(Card, {
  variants: {
    variant: {
      default: {
        base: [
          "rounded-[8px]",
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

export type ValueSectionProps = {
  title: string;
  items: string[];
  accentColor?: "teal" | "cyan";
  iconType?: "check" | "arrow" | "bullet";
  className?: string;
};

const CardValueSection = forwardRef<HTMLDivElement, ValueSectionProps>(
  function CardValueSection({ 
    title, 
    items, 
    accentColor = "teal",
    iconType = "arrow",
    className = "" 
  }, ref) {
    
    const renderIcon = () => {
      if (iconType === "check") {
        return (
          <svg
            className={`w-5 h-5 text-${accentColor}-400 mt-0.5 mr-3 flex-shrink-0`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      }
      
      if (iconType === "arrow") {
        return (
          <svg
            className={`w-5 h-5 text-${accentColor}-400 mt-0.5 mr-4 flex-shrink-0`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        );
      }
      
      // bullet
      return <span className={`text-${accentColor}-400 mr-3 mt-1`}>•</span>;
    };

    return (
      <CardValueExtended ref={ref} className={`p-8 ${className}`}>
        <h3 className="text-2xl font-bold text-white mb-6 text-center">{title}</h3>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-start">
              {renderIcon()}
              <span className="text-gray-300 text-lg leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </CardValueExtended>
    );
  }
);

export default CardValueSection;