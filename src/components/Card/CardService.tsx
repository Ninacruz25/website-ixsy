import { Card, extendVariants } from "@heroui/react";
import { forwardRef } from "react";

export const CardServiceExtended: any = extendVariants(Card, {
  variants: {
    variant: {
      default: {
        base: [
            "rounded-[8px]",
            "backdrop-blur-sm",
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

export type Service = {
  id: string;
  name: string;
  logo: string;
  description: string;
};

export type CardServiceProps = {
  service: Service;
  className?: string;
};

const CardService = forwardRef<HTMLDivElement, CardServiceProps>(
  function CardService({ service, className = "" }, ref) {
    return (
      <CardServiceExtended 
        ref={ref} 
        variant="default" 
        className={`group ${className}`}
      >
        <div className="p-6">
          {/* Logo del servicio */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-lg p-4 w-24 h-24 flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
              <img 
                src={service.logo} 
                alt={service.name}
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* Nombre del servicio */}
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {service.name}
            </h3>
          </div>

          {/* Descripción */}
          <div className="text-center">
            <p className="text-gray-300 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </CardServiceExtended>
    );
  }
);

export default CardService;