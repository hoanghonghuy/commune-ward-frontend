import { ThemeProvider as NextThemesProvider } from "next-themes";
import { createContext } from "react";

export const ThemeProviderContext = createContext();

export function ThemeProvider({ children, ...props }) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}