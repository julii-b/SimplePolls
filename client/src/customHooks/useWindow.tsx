import { useState, type JSX } from "react";
import Window from "../components/Window/Window.tsx";


/**
 * Custom hook to create and manage a window component.
 * 
 * @param param
 * @param {JSX.Element} param.children - Children/Content of the window
 * @param {string} param.windowClassName - Optional class name for the window
 * @param {string} param.closeButtonClassName - Optional class name for the close button
 * @returns {[JSX.Element, () => void, () => void]} Returns the window element (not visible by default), a function to show the window, and a function to hide the window
 */
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