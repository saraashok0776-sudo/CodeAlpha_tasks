// Global variables for ticket storage (simulates cloud database)
let tickets = JSON.parse(localStorage.getItem('busTickets')) || [];

// DOM Elements
const bookingForm = document.getElementById('bookingForm');
const totalPrice = document.getElementById('totalPrice');
const successModal = document.getElementById('successModal');
const ticketDetails = document.getElementById('ticketDetails');
const closeModal = document.getElementById('closeModal');
const ticketsList = document.getElementById('ticketsList');

// Price calculation
document.getElementById('passType').addEventListener('change', function() {
    const price = this.options[this.selectedIndex].dataset.price || 0;
    totalPrice.textContent = `₹${price}`;
});

// Form submission
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const ticket = {
        id: Date.now(),
        fromCity: document.getElementById('fromCity').value,
        toCity: document.getElementById('toCity').value,
        passType: document.getElementById('passType').value,
        passengerName: document.getElementById('passengerName').value,
        phone: document.getElementById('phone').value,
        price: document.querySelector('#passType option:checked').dataset.price,
        bookingDate: new Date().toLocaleString(),
        qrCode: `QR-${Date.now()}`, // Simulates QR code
        status: 'Active'
    };
    
    // Add to tickets array (cloud simulation)
    tickets.push(ticket);
    localStorage.setItem('busTickets', JSON.stringify(tickets));
    
    // Show success modal
    showTicketModal(ticket);
    
    // Reset form
    this.reset();
    totalPrice.textContent = '₹0';
});

// Show ticket in modal
function showTicketModal(ticket) {
    ticketDetails.innerHTML = `
        <h3><i class="fas fa-ticket-alt"></i> Ticket #${ticket.id}</h3>
        <p><strong>Route:</strong> ${ticket.fromCity} → ${ticket.toCity}</p>
        <p><strong>Pass:</strong> ${ticket.passType.charAt(0).toUpperCase() + ticket.passType.slice(1)} (${ticket.price})</p>
        <p><strong>Passenger:</strong> ${ticket.passengerName}</p>
        <p><strong>Phone:</strong> ${ticket.phone}</p>
        <p><strong>QR Code:</strong> ${ticket.qrCode}</p>
        <p><strong>Booked:</strong> ${ticket.bookingDate}</p>
    `;
    successModal.style.display = 'block';
}

// Close modal
closeModal.addEventListener('click', () => {
    successModal.style.display = 'none';
});

// Load tickets on page load
window.addEventListener('load', loadTickets);

function loadTickets() {
    ticketsList.innerHTML = '';
    
    if (tickets.length === 0) {
        ticketsList.innerHTML = '<p style="text-align: center; color: #7f8c8d;">No tickets booked yet. Book your first pass!</p>';
        return;
    }
    
    tickets.forEach(ticket => {
        const ticketCard = document.createElement('div');
        ticketCard.className = 'ticket-card';
        ticketCard.innerHTML = `
            <div class="ticket-header">
                <i class="fas fa-bus"></i>
                <span>${ticket.fromCity} → ${ticket.toCity}</span>
            </div>
            <div class="ticket-body">
                <p><strong>${ticket.passengerName}</strong></p>
                <p>${ticket.passType.toUpperCase()} PASS</p>
                <p>₹${ticket.price} | ${ticket.qrCode}</p>
                <p style="font-size: 0.9rem; color: #27ae60;">
                    ${ticket.status} • ${new Date(ticket.bookingDate).toLocaleDateString()}
                </p>
            </div>
        `;
        ticketsList.appendChild(ticketCard);
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});