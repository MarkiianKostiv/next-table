import { COLORS_LIGHT } from "../../constants/colors";
import { useTheme } from "../../hooks/use-theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='relative'
    >
      <Brightness2OutlinedIcon
        className={`transition-opacity duration-300 ${
          theme === COLORS_LIGHT ? "opacity-0" : "opacity-100"
        }`}
      />
      <LightModeOutlinedIcon
        className={`absolute left-0 top-0 transition-opacity duration-300 ${
          theme === COLORS_LIGHT ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
};
