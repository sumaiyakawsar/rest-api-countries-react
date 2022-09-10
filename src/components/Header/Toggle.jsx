import { useContext } from "react";
import { ThemeContext } from "../../api/themeContext";
import { BsSun, BsMoonFill } from "react-icons/bs";

const Toggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      {theme === "dark" ? (
        <button
          title="light" aria-label="light"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-white   shadow-none p-2 focus:outline-none text-md outline-none ring-transparent cursor-pointer"
        >
          <BsSun />
        </button>
      ) : (
        <button
          title="dark" aria-label="dark"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-[#111517] focus:outline-none shadow-none p-2 text-md rounded-full outline-none ring-transparent cursor-pointer"
        >
          <BsMoonFill />
        </button>
      )}
    </div>
  );
};

export default Toggle;
