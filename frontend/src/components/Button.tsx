import { ComponentPropsWithRef, FC } from "react";

type ButtonProps = ComponentPropsWithRef<"button">


const Button: FC<ButtonProps> = ({ children, className,disabled,...rest }) => {
    const classes = 
    disabled? `opacity-50 pointer-events-none cursor-not-allowed ${className}`:className;

    return (
        <button 
        className={classes}
        disabled={disabled}
        {...rest}
        >
            {children}
        </button>
    )
}

export default Button;