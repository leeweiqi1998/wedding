// Generate and download an .ics file (Apple Calendar, Outlook, etc.)
document.getElementById('cal-ics')?.addEventListener('click', () => {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SeanAndWeiQi//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:sean-weiqi-wedding-2026-11-07@seanandweiqi',
    'DTSTAMP:20260101T000000Z',
    'DTSTART:20261107T100000Z',
    'DTEND:20261107T160000Z',
    "SUMMARY:Sean & Wei Qi's Wedding Dinner",
    'DESCRIPTION:Black tie. Reception from 6pm\\, dinner at 7pm.',
    'LOCATION:Clifford Pier\\, The Fullerton Bay Hotel\\, 80 Collyer Quay\\, Singapore 049326',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sean-and-wei-qi.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
