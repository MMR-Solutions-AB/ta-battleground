import React, { useEffect, useState } from "react";

interface CountdownProps {
  startTime: Date;
  endTime: Date;
}

const Countdown: React.FC<CountdownProps> = ({ startTime, endTime }) => {
  const [now, setNow] = useState(new Date());
  const from = now > startTime ? now : startTime;
  const to = now > startTime ? endTime : now;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // get total seconds between the times
  let delta = Math.abs(from.getTime() - to.getTime()) / 1000;
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;
  const seconds = Math.floor(delta % 60);

  return (
    <h3 className="text-center font-serif text-4xl font-bold italic md:text-6xl">
      {days < 10 ? `0${days}` : days}:{hours < 10 ? `0${hours}` : hours}:
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </h3>
  );
};

export default Countdown;
