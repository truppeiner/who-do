async function rsvp_yesClickHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/events/rsvp_yes', {
      method: 'PUT',
      body: JSON.stringify({
        event_id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.rsvp_yes-btn').addEventListener('click', rsvp_yesClickHandler);