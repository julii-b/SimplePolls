import { useState, type JSX } from "react";
import Window from "../components/Window/Window.tsx";

const useWindow = ({
  children,
  windowClassName,
  closeButtonClassName
} : {
  children: JSX.Element,
  windowClassName?: string,
  closeButtonClassName?: string
}): [
  JSX.Element,
  () => void,
  () => void
] => {

  const [windowVisibility, setWindowVisibility] = useState(false);

  const showWindow = () => setWindowVisibility(true);
  const hideWindow = () => setWindowVisibility(false);

  const WindowEl = windowVisibility ? (
    <Window
      closeButtonFunction={hideWindow}
      windowClassName={windowClassName}
      closeButtonClassName={closeButtonClassName}
    >
      {children}
    </Window>
  ) : <></>;

  return [WindowEl, showWindow, hideWindow];
}
export default useWindow;