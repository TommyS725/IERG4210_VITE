import { ComponentPropsWithRef, FC } from "react";

type ButtonProps = ComponentPropsWithRef<"button"> &{
    isLink?: boolean;
}


const Button: FC<ButtonProps> = ({ children, className,disabled,isLink,...rest }) => {
    const disabled_class = disabled? "opacity-50 pointer-events-none cursor-not-allowed":""
    const link_class = isLink? "hover:underline hover:opacity-50":""

    return (
        <button 
        className={`${className} ${disabled_class} ${link_class}`}
        disabled={disabled}
        {...rest}
        >
            {children}
        </button>
    )
}

export default Button;