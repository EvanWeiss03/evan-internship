import { useEffect, useState } from "react";

export default function Countdown({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const time = expiryDate - Date.now();

      const hours = Math.floor(time / (60 * 60 * 1000));
      const minutes = Math.floor((time / (60 * 1000)) % 60);
      const seconds = Math.floor(time / 1000) % 60;

      if (time <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  if (timeLeft === "Expired") {
    return <></>;
  }
  return <div className="de_countdown">{timeLeft}</div>;
}
