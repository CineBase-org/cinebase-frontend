import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonClasses, type ButtonStyleProps } from "./buttonClasses";

interface Props
    extends
        ButtonStyleProps,
        Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
    icon?: ReactNode;
    children: ReactNode;
}

export const Button = ({
    variant,
    size,
    fullWidth,
    isActive,
    className,
    icon,
    children,
    type = "button",
    disabled,
    ...rest
}: Props) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={buttonClasses({
                variant,
                size,
                fullWidth,
                isActive,
                className,
            })}
            {...rest}
        >
            {icon}
            {children}
        </button>
    );
};
