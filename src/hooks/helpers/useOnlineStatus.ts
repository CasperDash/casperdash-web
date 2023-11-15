import { useEffect, useState } from 'react';

type Props = {
  onChangeStatus?: (onLine: boolean) => void;
};

export const useOnlineStatus = ({ onChangeStatus }: Props = {}) => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleEvent = () => {
      setOnline(navigator.onLine);
      onChangeStatus?.(navigator.onLine);
    };
    window.addEventListener('online', handleEvent);
    window.addEventListener('offline', handleEvent);
    return () => {
      window.removeEventListener('online', handleEvent);
      window.removeEventListener('offline', handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { online, offline: !online };
};
