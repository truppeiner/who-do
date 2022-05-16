async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      // where do we want to redirect users after deleting an event?
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-event-btn').addEventListener('click', deleteFormHandler);
  