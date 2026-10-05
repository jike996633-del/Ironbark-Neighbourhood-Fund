document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('look-form');
  const body = document.getElementById('rows');
  const flash = document.getElementById('flash');
  const labelSelect = document.getElementById('category');

  function buildPath() {
    const data = new FormData(form);
    const q = new URLSearchParams();
    ['date', 'location', 'category'].forEach((key) => {
      const value = String(data.get(key) || '').trim();
      if (value) q.set(key, value);
    });
    const qs = q.toString();
    return qs ? `/open/nights/filter?${qs}` : '/open/nights/filter';
  }

  function runLook() {
    request(buildPath())
      .then((rows) => {
        body.replaceChildren();
        if (!rows.length) {
          setFlash(flash, 'No nights match those filters.');
          return;
        }
        setFlash(flash, '');
        rows.forEach((row) => body.appendChild(rowFor(row)));
      })
      .catch(() => {
        setFlash(flash, 'The filter request failed. Check that the service is running.', true);
      });
  }

  request('/labels')
    .then((labels) => {
      labels.forEach((item) => {
        const opt = document.createElement('option');
        opt.value = item.name;
        opt.textContent = item.name;
        labelSelect.appendChild(opt);
      });
    })
    .catch(() => {
      setFlash(flash, 'Labels could not be loaded.', true);
    });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    runLook();
  });

  form.addEventListener('reset', () => {
    setTimeout(runLook, 0);
  });

  runLook();
});
