import type { JSX } from "react/jsx-dev-runtime";
import DownloadButtonApple from "./DownloadButtonApple";
import DownloadButtonOther from "./DownloadButtonOther";

function isIOS(): boolean {
  const ua = navigator.userAgent;
  const iOSDevice = /iPad|iPhone|iPod/.test(ua);
  const iPadOS = !iOSDevice && ua.includes("Mac OS X") && navigator.maxTouchPoints > 1;
  return iOSDevice || iPadOS;
}

function isMacSafari(): boolean {
  const ua = navigator.userAgent;
  const isMac = ua.includes("Mac OS X") && navigator.maxTouchPoints <= 1;
  const isSafari = /Safari/.test(ua) && !/Chrome/.test(ua) && !/Edg/.test(ua) && !/OPR/.test(ua);
  return isMac && isSafari;
}

/**
 * A button to show the appropriate install prompt based on the device.
 * 
 * @returns {JSX.Element} The rendered button component.
 */
const DownloadButton = (): JSX.Element => {
  if (isIOS() || isMacSafari()) {
    return <DownloadButtonApple />;
  } else {
    return <DownloadButtonOther />;
  }
};

export default DownloadButton;
