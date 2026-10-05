const SERVICE_URL = 'http://localhost:3012';

function request(path) {
  return fetch(`${SERVICE_URL}${path}`).then((res) =>
    res.json().then((body) => {
      if (!res.ok) {
        const err = new Error(body.error || 'Request failed.');
        err.status = res.status;
        throw err;
      }
      return body;
    })
  );
}

function ticketText(value) {
  const n = Number(value);
  return n === 0 ? 'Free' : `A$${n.toFixed(2)}`;
}

function clock(iso) {
  return new Date(iso).toLocaleString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

function setFlash(el, text, isAlert) {
  el.hidden = !text;
  el.className = isAlert ? 'alert' : 'flash';
  el.textContent = text || '';
}

function rowFor(event) {
  const tr = document.createElement('tr');
  const stamp = event.timing === 'Past' ? '<span class="stamp">Past</span>' : '';
  tr.innerHTML = `
    <td>${clock(event.event_date)}</td>
    <td><a href="one.html?id=${event.id}">${event.name}</a> ${stamp}</td>
    <td>${event.location}</td>
    <td>${event.category_name}</td>
    <td>${ticketText(event.ticket_price)}</td>
  `;
  return tr;
}

function highlightMenu() {
  const file = location.pathname.split('/').pop() || 'start.html';
  document.querySelectorAll('nav a').forEach((link) => {
    if (link.getAttribute('href') === file) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

document.addEventListener('DOMContentLoaded', highlightMenu);
