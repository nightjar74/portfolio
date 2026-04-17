import * as React from "react";
import "./Button.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonVariant = "solid" | "outline" | "ghost" | "soft";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonColor =
  | "primary"
  | "neutral"
  | "success"
  | "danger"
  | "warning"
  | "info";
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "full";

export type ButtonProps<C extends React.ElementType = "button"> =
  React.ComponentPropsWithoutRef<C> & {
    /** Visual style of the button */
    variant?: ButtonVariant;
    /** Size preset */
    size?: ButtonSize;
    /** Color theme */
    color?: ButtonColor;
    /** Border radius preset */
    radius?: ButtonRadius;
    /** Shows a loading spinner and disables interaction */
    loading?: boolean;
    /** Stretches the button to fill its container */
    fullWidth?: boolean;
    /** Icon placed before the label */
    leftIcon?: React.ReactNode;
    /** Icon placed after the label */
    rightIcon?: React.ReactNode;
    /** Renders as a square icon-only button — set instead of children */
    iconOnly?: React.ReactNode;
    /** Renders the button using a different element or component (e.g. 'a', Link) */
    as?: C;
  };

// ─── Spinner ─────────────────────────────────────────────────────────────────

const Spinner: React.FC = () => (
  <svg
    className="btn-spinner"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6" strokeWidth="2" className="btn-spinner-track" />
    <path
      d="M8 2a6 6 0 0 1 6 6"
      strokeWidth="2"
      strokeLinecap="round"
      className="btn-spinner-arc"
    />
  </svg>
);

// ─── Button ───────────────────────────────────────────────────────────────────

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      color = "primary",
      radius = "md",
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      iconOnly,
      as: Tag = "button",
      children,
      className = "",
      disabled,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const classes = [
      "btn",
      `btn--${variant}`,
      `btn--${size}`,
      `btn--${color}`,
      `btn--radius-${radius}`,
      iconOnly ? "btn--icon-only" : "",
      fullWidth ? "btn--full" : "",
      loading ? "btn--loading" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Tag
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...rest}
      >
        {loading && <Spinner />}

        {!loading && leftIcon && (
          <span className="btn-icon btn-icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {iconOnly ? (
          <span className="btn-icon btn-icon--only" aria-hidden="true">
            {iconOnly}
          </span>
        ) : (
          <span className="btn-label">{children}</span>
        )}

        {!loading && rightIcon && (
          <span className="btn-icon btn-icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </Tag>
    );
  },
);

CustomButton.displayName = "Button";

// ─── ButtonGroup ──────────────────────────────────────────────────────────────

export interface ButtonGroupProps {
  children: React.ReactNode;
  /** Stack buttons vertically */
  vertical?: boolean;
  /** Attach buttons flush against each other */
  attached?: boolean;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  vertical = false,
  attached = false,
  className = "",
}) => {
  const classes = [
    "btn-group",
    vertical ? "btn-group--vertical" : "",
    attached ? "btn-group--attached" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};
