import { useEffect, useState } from "react";
import { BsMoonStars, BsTranslate } from "react-icons/bs";
import Menu from "../../Menu";
import { LANGS, THEME } from "./Item";

function Options() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const handleChangeTheme = (val: string) => {
    setTheme(val);
  };

  useEffect(() => {
    if (theme) {
      const historyTheme = localStorage.getItem("theme");
      if (historyTheme) {
        document.documentElement.classList.remove(historyTheme);
      }
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <div className="space-x-4 pl-6 border-l border-slate-300 lg:flex items-center relative">
      <Menu className="w-32" data={THEME} onChange={handleChangeTheme}>
        <BsMoonStars size={18} />
      </Menu>
      <Menu
        className="w-28"
        data={LANGS}
        onChange={(value) => {
          console.log(value);
        }}
      >
        <BsTranslate size={18} />
      </Menu>
    </div>
  );
}

export default Options;
