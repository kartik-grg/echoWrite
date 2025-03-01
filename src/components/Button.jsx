import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-violet-600",
    textColor = "text-white",
    className = "",
    isLoading = false,
    loadingText = "Loading...",
    ...props
}) {
    return (
        <button 
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}
            transform transition-all duration-200
            hover:shadow-lg hover:scale-105
            active:scale-95 active:shadow-inner
            focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-violet-500
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    <span>{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}