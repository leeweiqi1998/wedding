import { useEffect, useState } from 'react';

const TARGET = new Date('2026-11-07T18:30:00+08:00').getTime();

function diff(now) {
  const ms = Math.max(0, TARGET - now);
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const [t, setT] = useState(() => diff(Date.now()));
  useEffect(() => {
    const id = setInterval(() => setT(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown" aria-label="Time until the wedding">
      <Cell n={t.days} l="Days" />
      <Cell n={t.hours} l="Hours" />
      <Cell n={t.minutes} l="Minutes" />
      <Cell n={t.seconds} l="Seconds" />
    </div>
  );
}

function Cell({ n, l }) {
  return (
    <div className="countdown-cell">
      <div className="countdown-num">{String(n).padStart(2, '0')}</div>
      <div className="countdown-label">{l}</div>
    </div>
  );
}
