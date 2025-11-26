import { Card, extendVariants } from "@heroui/react";
import { forwardRef } from "react";
import ButtonIXSY from "../ButtonIXSY/ButtonIXSY";

export const CardDetailExtended: any = extendVariants(Card, {
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

export type PricingInfo = {
  monthly?: string;
  annual?: string;
  currency?: string;
  currencyAnnual?: string;
  sizes?: Array<{ size: string; price: string; period: string }>;
  mainPrice?: string;
  mainPeriod?: string;
};

export type MembershipDetail = {
  title: string;
  subtitle?: string;
  features: string[];
  pricing: PricingInfo;
  isSpecial?: boolean;
  ctaLink?: string;
  ctaText?: string;
};

export type CardMembershipDetailProps = {
  membership: MembershipDetail;
  className?: string;
  showGlow?: boolean;
};

const CardMembershipDetail = forwardRef<HTMLDivElement, CardMembershipDetailProps>(
  function CardMembershipDetail({ membership, className = "" }, ref) {
    const variant = membership.isSpecial ? "special" : "default";
    const accentColor = membership.isSpecial ? "cyan" : "teal";
    const glowGradient = membership.isSpecial
      ? "from-cyan-500 to-teal-500"
      : "from-teal-500 to-cyan-500";

    return (
      <div className="max-w-2xl mx-auto">
        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {membership.title}
          </h2>
          {membership.subtitle && (
            <p className="text-lg text-gray-300">{membership.subtitle}</p>
          )}
        </div>

        {/* Card Principal */}
        <div className="relative group mb-8">

          <CardDetailExtended ref={ref} variant={variant} className={`relative ${className}`}>
            <div className="p-8">
              {/* Lista de características */}
              <div className="space-y-4 mb-8">
                {membership.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
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
                    <span className="text-gray-300 text-lg leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Precios por tamaño (para MEDIUM) */}
              {membership.pricing.sizes && (
                <div className="space-y-3 mb-8">
                  {membership.pricing.sizes.map((price, index) => (
                    <div key={index} className="flex justify-between items-center text-white">
                      <span className="text-lg">{price.size}</span>
                      <div className="text-right">
                        <span className="text-xl font-bold">{price.price}</span>
                        <span className="text-gray-300 ml-2 text-sm">{price.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Precios (para SMALL y LARGE) */}
              {membership.pricing.monthly && membership.pricing.annual && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {membership.pricing.monthly}
                    </div>
                    <div className="text-gray-300">{membership.pricing.currency}</div>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {membership.pricing.annual}
                    </div>
                    <div className="text-gray-300">{membership.pricing.currencyAnnual}</div>
                  </div>
                </div>
              )}

              {/* Precio principal (para MEDIUM y SOCIO) */}
              {membership.pricing.mainPrice && (
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-white mb-2">
                    {membership.pricing.mainPrice}
                  </div>
                  <div className="text-gray-300">{membership.pricing.mainPeriod}</div>
                </div>
              )}

              {/* Precio único (para SOCIO PROVEEDOR) */}
              {!membership.pricing.monthly && !membership.pricing.mainPrice && membership.pricing.annual && (
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-white mb-2">
                    {membership.pricing.annual}
                  </div>
                  <div className="text-gray-300">{membership.pricing.currencyAnnual}</div>
                </div>
              )}

              {/* Botón de Compra */}
              <div className="text-center">
                <ButtonIXSY
                  as="a"
                  href={membership.ctaLink || "/contact"}
                  className={`bg-${accentColor}-500 hover:bg-${accentColor}-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105`}
                >
                  {membership.ctaText || "COMPRAR"}
                </ButtonIXSY>
              </div>
            </div>
          </CardDetailExtended>
        </div>
      </div>
    );
  }
);

export default CardMembershipDetail;