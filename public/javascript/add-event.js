async function newFormHandler(event) {
    event.preventDefault();
  
    const event_name = document.querySelector('input[name="event-name"]').value;
    const event_description = document.querySelector('input[name="event-description"]').value;
    const event_location = document.querySelector('input[name="event-location"]').value;
    const event_date = document.querySelector('input[name="event-date"]').value;
    const event_start_time = document.querySelector('input[name="event-start-time"]').value;
    const event_end_time = document.querySelector('input[name="event-end-time"]').value;
    const event_url = document.querySelector('input[name="event-url"]').value;

    const response = await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        event_name,
        event_description,
        event_location,
        event_date,
        event_start_time,
        event_end_time,
        event_url
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      // where do we want to redirect users after they post an event?   
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#event-create').addEventListener('click', newFormHandler);
  