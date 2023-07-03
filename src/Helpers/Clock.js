import { useEffect, useState } from 'react';

export const Clock = () => {
  const d = new Date();
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const date = d.getHours() + ' : ' + d.getMinutes() + ' : ' + d.getSeconds();
    const timer = setInterval(() => {
      setCurrentTime(date);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTime]);

  return currentTime;
};
