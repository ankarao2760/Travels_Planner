function openDetails(destination) {
    if (destination === 'tokyo') {
      window.location.href = 'tokyo-details.html'; // Add this file with Tokyo's information.
    }
  }
  function bookTicket(city) {
    const bookingId = Math.random().toString(36).substring(2, 10).toUpperCase();
    alert(`Your ticket for ${city} has been booked! Booking ID: ${bookingId}`);
  }
  
  function viewDetails(page) {
    window.location.href = page;
  }
  