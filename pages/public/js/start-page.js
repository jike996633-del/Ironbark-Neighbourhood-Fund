document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('rows');
  const flash = document.getElementById('flash');

  request('/open/nights')
    .then((rows) => {
      body.replaceChildren();
      if (!rows.length) {
        setFlash(flash, 'No upcoming nights are on the timetable.');
        return;
      }
      setFlash(flash, '');
      rows.forEach((row) => body.appendChild(rowFor(row)));
    })
    .catch(() => {
      setFlash(flash, 'The timetable could not be loaded. Check that the service is running.', true);
    });
});
