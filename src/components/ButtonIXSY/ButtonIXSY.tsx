import { Button, extendVariants } from "@heroui/react";
import { forwardRef } from "react";

export const ButtonExtended = extendVariants(Button, {


  variants: {
    variant: {
      primary: "bg-[#028FB7] rounded-[8px] hover:bg-[#087E9F] text-white text-center !font-medium !leading-[16px] !font-[Poppins]",
      secondary: "rounded-[8px] w-full bg-gray-700 hover:bg-gray-600 text-white transform hover:scale-105",
    },
    isDisabled: {
      true: "opacity-50 pointer-events-none cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type ButtonIXSYProps = React.ComponentProps<typeof ButtonExtended> & {
  variantButton?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

const ButtonIXSY = forwardRef<HTMLButtonElement, ButtonIXSYProps>(
  function Button(
    { variantButton = "primary", isDisabled, className = "", ...props },
    ref
  ) {
    return (
      <ButtonExtended
        ref={ref}
        variant={variantButton}
        isDisabled={isDisabled}
        className={className}
        {...props}
      />
    );
  }
);

export default ButtonIXSY;