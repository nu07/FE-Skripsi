"use client";

import type React from "react";
import { createContext, useContext } from "react";

interface TabsContextType {
    value: string;
    onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

const Tabs = ({ value, onValueChange, children, className = "" }: TabsProps) => {
    return (
        <TabsContext.Provider value={{ value, onValueChange }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

interface TabsListProps {
    children: React.ReactNode;
    className?: string;
}

const TabsList = ({ children, className = "" }: TabsListProps) => {
    return <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}>{children}</div>;
};

interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

const TabsTrigger = ({ value, children, className = "" }: TabsTriggerProps) => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("TabsTrigger must be used within Tabs");
    }

    const { value: selectedValue, onValueChange } = context;
    const isActive = selectedValue === value;

    return (
        <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                isActive ? "bg-white text-gray-950 shadow-sm" : "text-gray-500 hover:text-gray-900"
            } ${className}`}
            onClick={() => onValueChange(value)}>
            {children}
        </button>
    );
};

interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

const TabsContent = ({ value, children, className = "" }: TabsContentProps) => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error("TabsContent must be used within Tabs");
    }

    const { value: selectedValue } = context;

    if (selectedValue !== value) {
        return null;
    }

    return (
        <div
            className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`}>
            {children}
        </div>
    );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
