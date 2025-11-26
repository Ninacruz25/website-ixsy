import { Card, extendVariants } from "@heroui/react";
import { forwardRef } from "react";
import ButtonIXSY from "../ButtonIXSY/ButtonIXSY";

export const CardExtended: any = extendVariants(Card, {
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

      special: {
        base: [
          "rounded-[8px]",
          "backdrop-blur-sm",
          "border border-gray-500/50",
          "hover:border-cyan-500/50",
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

export type MembershipPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  isSpecial?: boolean;
};

export type CardMembershipProps = {
  plan: MembershipPlan;
  className?: string;
};

const CardMembership = forwardRef<HTMLDivElement, CardMembershipProps>(
  function CardMembership({ plan, className = "" }, ref) {
    const variant = plan.isSpecial ? "special" : "default";

    // Clases completas para Tailwind
    const titleColorClass = plan.isSpecial ? "text-cyan-400" : "text-teal-500";

    const checkIconColorClass = plan.isSpecial ? "text-cyan-400" : "text-teal-400";

    const glowGradientClass = "from-cyan-500 to-teal-500";

    const glowOpacityClass = "opacity-20";

    const primaryButtonClass = plan.isSpecial
      ? "bg-cyan-500 hover:bg-cyan-600"
      : "bg-teal-600 hover:bg-teal-700";

    return (
      <div className="relative group">

        <CardExtended 
          ref={ref} 
          variant={variant} 
          className={`relative ${className}`}
        >
          {/* Header - Nombre y Precio */}
          <div className="flex flex-col items-center pb-0 pt-8 px-6">
            <h3 className={`text-2xl font-bold mb-4 ${titleColorClass}`}>
              {plan.name}
            </h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-gray-300 ml-2">/ {plan.period}</span>
            </div>
          </div>

          {/* Body - Features */}
          <div className="py-6 px-6">
            <div className="space-y-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg
                    className={`w-5 h-5 ${checkIconColorClass} mt-0.5 mr-3 flex-shrink-0`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300 text-sm leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer - Botones */}
          <div className="flex flex-col gap-3 pt-0 pb-8 px-6">
            <ButtonIXSY
              as="a"
              href={'/'}
              variantButton="primary"
            >
              COMPRAR
            </ButtonIXSY>

            <ButtonIXSY
              as="a"
              href={`/membership/MoreInfo`}
              variant="secondary"
            >
              MÁS INFORMACIÓN
            </ButtonIXSY>
          </div>
        </CardExtended>
      </div>
    );
  }
);

export default CardMembership;