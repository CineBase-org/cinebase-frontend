import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { buttonClasses, type ButtonStyleProps } from "./buttonClasses";

interface Props
    extends
        ButtonStyleProps,
        Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> {
    to?: string;
    href?: string;
    icon?: ReactNode;
    children: ReactNode;
}

export const LinkButton = ({
    to,
    href,
    variant,
    size,
    fullWidth,
    isActive,
    disabled,
    className,
    icon,
    children,
    ...rest
}: Props) => {
    const classes = buttonClasses({
        variant,
        size,
        fullWidth,
        isActive,
        disabled,
        className,
    });

    if (to) {
        return (
            <Link
                to={to}
                className={classes}
                {...rest}
            >
                {icon}
                {children}
            </Link>
        );
    }

    return (
        <a
            className={classes}
            href={disabled ? undefined : href}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={disabled || undefined}
            onClick={(event) => {
                if (disabled) event.preventDefault();
            }}
            {...rest}
        >
            {icon}
            {children}
        </a>
    );
};
