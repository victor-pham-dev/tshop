import { useContext } from "react";
import { LoadingContext } from "../contexts/LoadingContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
import { CartContext } from "@/contexts/CartContext";

export const useLoading = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  return { isLoading, setIsLoading };
};

export const useUser = () => {
  const { user, update, reset, login } = useContext(UserContext);
  return { user, update, reset, login };
};

export const useTheme = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  return { theme, changeTheme };
};

export const useCart = () => {
  const { cart, updateAll, update, add, remove, markCheck } =
    useContext(CartContext);
  return { cart, updateAll, update, add, remove, markCheck };
};
