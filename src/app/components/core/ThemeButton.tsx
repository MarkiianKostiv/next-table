import { COLORS_LIGHT } from "../../constants/colors";
import { useTheme } from "../../hooks/use-theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined";

export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {theme === COLORS_LIGHT ? (
        <Brightness2OutlinedIcon />
      ) : (
        <LightModeOutlinedIcon />
      )}
    </button>
  );
};
