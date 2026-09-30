import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<LinkProps, "className" | "children"> & {
    to: LinkProps["to"];
    href?: undefined;
    className?: string;
    children?: ReactNode;
  };

type ButtonAsAnchor = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    to?: undefined;
    className?: string;
    children?: ReactNode;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const variantStyles: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-light shadow-soft",
  secondary: "bg-blue text-white hover:bg-blue/90 shadow-soft",
  outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent",
  ghost: "text-primary hover:bg-primary/5 bg-transparent",
  gold: "bg-gold text-primary hover:bg-gold-light shadow-soft font-semibold",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

/**
 * Renders as a native <button>, a React Router <Link> (when `to` is given),
 * or a plain <a> (when `href` is given) — always sharing the same visual
 * styling and never nesting an <a>/<Link> inside a <button> (invalid HTML).
 */
export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    fullWidth,
    className,
    children,
    ...rest
  } = props;

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  if ("to" in props && props.to !== undefined) {
    const { to, ...linkRest } = rest as Omit<ButtonAsLink, keyof SharedProps | "className" | "children">;
    return (
      <Link to={to} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<ButtonAsAnchor, keyof SharedProps | "className" | "children">;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
