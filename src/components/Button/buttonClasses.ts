import clsx from "clsx";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "secondary" | "outline" | "text";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    isActive?: boolean;
    disabled?: boolean;
    className?: string;
}

export const buttonClasses = ({
    variant = "primary",
    size = "md",
    fullWidth,
    isActive,
    disabled,
    className,
}: ButtonStyleProps) =>
    clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isActive && styles.active,
        disabled && styles.disabled,
        className,
    );
