// Sample transfer data with coordinates for map
const sampleTransfers = [
    {
        id: 1,
        current: "New York, NY",
        desired: "Los Angeles, CA",
        details: "City Carrier - Manhattan routes. Looking for sunny CA life.",
        contact: "nycarrier87@usps.gov",
        date: "2 days ago",
        currentLat: 40.7128,
        currentLng: -74.0060,
        desiredLat: 34.0522,
        desiredLng: -118.2437
    },
    {
        id: 2,
        current: "Chicago, IL",
        desired: "Austin, TX",
        details: "Rural Carrier. Want warmer weather and BBQ!",
        contact: "chiwindy@usps.gov",
        date: "1 week ago",
        currentLat: 41.8781,
        currentLng: -87.6298,
        desiredLat: 30.2672,
        desiredLng: -97.7431
    },
    {
        id: 3,
        current: "Miami, FL",
        desired: "Seattle, WA",
        details: "Clerk position. Tired of the heat, love the rain.",
        contact: "(305) 555-0192",
        date: "3 days ago",
        currentLat: 25.7617,
        currentLng: -80.1918,
        desiredLat: 47.6062,
        desiredLng: -122.3321
    }
];

let map;
let markers = [];

// Initialize Leaflet Map
function initMap() {
    // Create map centered on US
    map = L.map('transfer-map').setView([39.8283, -98.5795], 4);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);

    // Add markers for current locations
    sampleTransfers.forEach(transfer => {
        // Current location marker (blue)
        const currentMarker = L.marker([transfer.currentLat, transfer.currentLng], {
            title: `From: ${transfer.current}`
        }).addTo(map);
        
        currentMarker.bindPopup(`
            <b>From:</b> ${transfer.current}<br>
            <b>To:</b> ${transfer.desired}<br>
            <b>Details:</b> ${transfer.details}<br>
            <b>Contact:</b> ${transfer.contact}
        `);

        markers.push(currentMarker);

        // Desired location marker (green) with connecting line
        const desiredMarker = L.marker([transfer.desiredLat, transfer.desiredLng], {
            title: `To: ${transfer.desired}`
        }).addTo(map);
        
        desiredMarker.bindPopup(`
            <b>From:</b> ${transfer.current}<br>
            <b>Wants:</b> ${transfer.desired}<br>
            <b>Details:</b> ${transfer.details}
        `);

        markers.push(desiredMarker);

        // Draw line between current and desired
        L.polyline([
            [transfer.currentLat, transfer.currentLng],
            [transfer.desiredLat, transfer.desiredLng]
        ], {
            color: '#003087',
            weight: 3,
            opacity: 0.7,
            dashArray: '8, 8'
        }).addTo(map);
    });

    // Fit map to show all markers
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
}

// Render sample transfers (list view)
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
            <button class="btn-primary" style="margin-top: 12px; width: 100%;" onclick="highlightTransfer(${transfer.id})">View on Map</button>
        `;
        container.appendChild(card);
    });
}

// Highlight transfer on map
function highlightTransfer(id) {
    const transfer = sampleTransfers.find(t => t.id === id);
    if (transfer && map) {
        map.flyTo([transfer.currentLat, transfer.currentLng], 6, {
            duration: 1.5
        });
        
        // Optional: open popup after fly
        setTimeout(() => {
            const popupContent = `
                <b>From:</b> ${transfer.current}<br>
                <b>To:</b> ${transfer.desired}<br>
                <b>Details:</b> ${transfer.details}
            `;
            L.popup()
                .setLatLng([transfer.currentLat, transfer.currentLng])
                .setContent(popupContent)
                .openOn(map);
        }, 1600);
    }
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
    
    // Add to sample list (demo) - note: real coords would need geocoding
    sampleTransfers.unshift({
        id: Date.now(),
        current: current,
        desired: desired,
        details: "New request - details pending",
        contact: "Pending verification",
        date: "Just now",
        currentLat: 39.8283 + (Math.random() * 8 - 4),
        currentLng: -98.5795 + (Math.random() * 20 - 10),
        desiredLat: 39.8283 + (Math.random() * 8 - 4),
        desiredLng: -98.5795 + (Math.random() * 20 - 10)
    });
    
    renderTransfers(sampleTransfers);
    // Refresh map with new marker (simple version)
    if (map) {
        map.remove();
        initMap();
    }
});

// GSAP Animation for carriers
function initAnimation() {
    if (typeof gsap !== 'undefined') {
        const leftCarrier = document.querySelector('.mail-carrier.left');
        const rightCarrier = document.querySelector('.mail-carrier.right');
        const letter = document.getElementById('letter');
        
        gsap.to(leftCarrier, { y: -15, duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(rightCarrier, { y: -12, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(letter, { scale: 1.15, rotation: 8, duration: 1.8, repeat: -1, yoyo: true, ease: "power1.inOut" });
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
    initMap();  // Initialize the map
    
    // Keyboard support for search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') filterTransfers();
    });
    
    console.log('%cSwapMail with Live Map ready! 🚚📍', 'color: #003087; font-size: 16px;');
});