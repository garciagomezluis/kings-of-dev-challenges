import { useState } from "react";
import "./styles.css";

const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);

  return { value, toggle };
};

export default function App() {
  const { value: lightsOn, toggle: switchTheme } = useToggle(true);

  const theme = lightsOn ? "light" : "dark";

  return (
    <div className={`App ${theme}-theme`}>
      <h1>Current theme: {theme}</h1>
      <p>
        Light themes have lighter backgrounds and darker font colors. Meanwhile,
        dark themes have darker backgrounds and lighter font colors. Dark themes
        prevent <strong>Eyes Strain </strong>
        and reduce device energy consumption
      </p>
      <h3>What we expect?</h3>
      <p>The button below should toggle between light and dark mode</p>
      <button onClick={switchTheme}>Toggle theme</button>
    </div>
  );
}
