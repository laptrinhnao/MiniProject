import { createContext, useContext } from "react";
import { ThemeContextProp } from "../../type";

export const ThemeContext = createContext<ThemeContextProp>({
  themeContext: "light",
  setTheme: () => {},
});
export const GlobalContext = () => useContext(ThemeContext);
