import React, { createContext, ReactNode } from "react";
import { STORAGE } from "../const/app-const";
import { useStorage } from "../hooks";

interface ThemeProps {
  content: "lightTheme" | "darkTheme";
  section: "lightSection" | "darkSection";
  bgfull: "lightbg" | "darkbg";
}

export const lightTheme: ThemeProps = {
  content: "lightTheme",
  section: "lightSection",
  bgfull: "lightbg",
};

export const darkTheme: ThemeProps = {
  content: "darkTheme",
  section: "darkSection",
  bgfull: "darkbg",
};
export interface themeContextType {
  theme: ThemeProps;
  changeTheme: (newTheme: "light" | "dark") => void;
}

const ThemeContext = createContext<themeContextType>({
  theme: lightTheme,
  changeTheme: () => {},
});

type Props = {
  children: ReactNode;
};

function ThemeContextProvider({ children }: Props) {
  const [theme, setTheme] = useStorage(STORAGE.LOCAL, "theme", darkTheme);
  function changeTheme(newTheme: "light" | "dark") {
    if (newTheme === "light") {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
