import { useContext } from "react";
import { CoreContext } from "../provider/CoreProvider";

export const useCoreContext = () => {
  const value = useContext(CoreContext);
  return value;
};
