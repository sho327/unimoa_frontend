import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: "primary" | "outline" | "ghost";
}

export const Button = ({ children, isLoading, variant = "primary", className, ...props }: ButtonProps) => {
    const variantClass = {
        primary: "btn-primary text-white border-none shadow-md shadow-primary/10",
        outline: "btn-outline border-gray-300 bg-white text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-800",
        ghost: "btn-ghost",
    };

    return (
        <button
            {...props}
            className={`btn normal-case rounded-xl font-bold transition-all ${variantClass[variant]} ${className || ""}`}
            disabled={isLoading || props.disabled}
        >
            {isLoading ? (
                <>
                    <span className="loading loading-spinner loading-xs"></span>
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
};