import { useEffect, useState } from "react";

/**
 * Custom hook to determine if the user is online.
 * @returns {boolean} - True if the user is online, false otherwise.
 */
const useIsOnline = (): boolean => {

  // get initial online status:
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  // update online status on online/offline events:
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
export default useIsOnline;