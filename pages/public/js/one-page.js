document.addEventListener('DOMContentLoaded', () => {
  const flash = document.getElementById('flash');
  const sheet = document.getElementById('sheet');
  const dialog = document.getElementById('built');
  const closer = document.getElementById('close-built');
  const id = new URLSearchParams(location.search).get('id');

  if (!id) {
    setFlash(flash, 'This page needs a night id in the address.', true);
    return;
  }

  request(`/open/nights/${id}`)
    .then((night) => {
      setFlash(flash, '');
      const raised = Number(night.current_amount);
      const goal = Number(night.goal_amount);
      const pct = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

      sheet.hidden = false;
      sheet.innerHTML = `
        <p>${night.category_name} · ${night.location} · ${night.timing}</p>
        <h2>${night.name}</h2>
        <p>${night.full_description}</p>
        <div class="pairs">
          <span>When</span><span>${clock(night.event_date)}</span>
          <span>Ticket</span><span>${ticketText(night.ticket_price)}</span>
          <span>Purpose</span><span>${night.purpose}</span>
          <span>Raised</span><span>A$${raised.toFixed(2)} of A$${goal.toFixed(2)} (${pct}%)</span>
        </div>
        <div class="meter"><i style="width:${pct}%"></i></div>
        <p>${night.organisation_name}<br>${night.address}<br>${night.contact_email} · ${night.contact_phone}</p>
        <form class="sign" id="sign-form" novalidate>
          <label>Name<input type="text" name="name"></label>
          <label>Email<input type="email" name="email"></label>
          <label>Tickets<input type="number" name="tickets" min="1"></label>
          <button type="submit">Register</button>
        </form>
      `;

      document.getElementById('sign-form').addEventListener('submit', (e) => {
        e.preventDefault();
        dialog.showModal();
      });
    })
    .catch((err) => {
      if (err.status === 404) {
        setFlash(flash, 'That night is not available.', true);
        return;
      }
      setFlash(flash, 'The night could not be loaded.', true);
    });

  closer.addEventListener('click', () => {
    dialog.close();
  });
});
