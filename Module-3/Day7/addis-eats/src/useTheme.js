import { useContext } from "react";
import { ThemeContext } from "./ThemeContext.js";

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (ctx === null) {
        throw new Error("useTheme must be used inside a ThemeProvider");
    }
    return ctx;
}