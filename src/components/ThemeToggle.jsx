import { useEffect } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { Switch } from "./Switch";

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("ds_theme", "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <Switch
      value={theme === "dark"}
      onChange={(on) => setTheme(on ? "dark" : "light")}
      label={"Theme: " + theme}
    />
  );
}
