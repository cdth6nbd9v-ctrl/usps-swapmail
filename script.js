// Sample transfer data
const sampleTransfers = [
    {
        id: 1,
        current: "New York, NY",
        desired: "Los Angeles, CA",
        details: "City Carrier - Manhattan routes. Looking for sunny CA life.",
        contact: "nycarrier87@usps.gov",
        date: "2 days ago"
    },
    {
        id: 2,
        current: "Chicago, IL",
        desired: "Austin, TX",
        details: "Rural Carrier. Want warmer weather and BBQ!",
        contact: "chiwindy@usps.gov",
        date: "1 week ago"
    },
    {
        id: 3,
        current: "Miami, FL",
        desired: "Seattle, WA",
        details: "Clerk position. Tired of the heat, love the rain.",
        contact: "(305) 555-0192",
        date: "3 days ago"
    }
];

// Render sample transfers
function renderTransfers(transfers) {
    const container = document.getElementById('transfers-list');
    container.innerHTML = '';
    
    transfers.forEach(transfer => {
        const card = document.createElement('div');
        card.className = 'transfer-card';
        card.innerHTML = `
            <h3>${transfer.current} → ${transfer.desired}</h3>
            <p><strong>Details:</strong> ${transfer.details}</p>
            <p><strong>Posted:</strong> ${transfer.date}</p>
            <p><strong>Contact:</strong> ${transfer.contact}</p>
            <button class="btn-primary" style="margin-top: 12px; width: 100%;">Message Carrier</button>
        `;
        container.appendChild(card);
    });
}

// Filter transfers (basic search)
function filterTransfers() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = sampleTransfers.filter(t => 
        t.current.toLowerCase().includes(query) ||
        t.desired.toLowerCase().includes(query) ||
        t.details.toLowerCase().includes(query)
    );
    renderTransfers(filtered.length ? filtered : sampleTransfers);
}

// Form submission
document.getElementById('transfer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const current = document.getElementById('current-loc').value;
    const desired = document.getElementById('desired-loc').value;
    
    alert(`✅ Transfer request from ${current} to ${desired} submitted successfully!\n\nA fellow carrier will reach out soon.`);
    
    // Reset form
    this.reset();
    
    // Add to sample list (demo)
    sampleTransfers.unshift({
        id: Date.now(),
        current: current,
        desired: desired,
        details: "New request - details pending",
        contact: "Pending verification",
        date: "Just now"
    });
    
    renderTransfers(sampleTransfers);
});

// GSAP Animation for carriers
function initAnimation() {
    if (typeof gsap !== 'undefined') {
        const leftCarrier = document.querySelector('.mail-carrier.left');
        const rightCarrier = document.querySelector('.mail-carrier.right');
        const letter = document.getElementById('letter');
        
        // Gentle bobbing animation
        gsap.to(leftCarrier, {
            y: -15,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        gsap.to(rightCarrier, {
            y: -12,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        // Letter handoff pulse
        gsap.to(letter, {
            scale: 1.15,
            rotation: 8,
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }
}

// Modal functions
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

function hideLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function fakeLogin() {
    alert("🎉 Welcome back, Carrier! You're now logged in.");
    hideLoginModal();
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    renderTransfers(sampleTransfers);
    initAnimation();
    
    // Keyboard support for search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterTransfers();
        }
    });
    
    console.log('%cSwapMail ready! 🚚📬', 'color: #003087; font-size: 16px;');
});