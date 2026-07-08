// Supabase Configuration
const supabaseUrl = 'https://agfkbgktzqydbcbxgrou.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZmtiZ2t0enF5ZGJjYnhncm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0ODUxMTIsImV4cCI6MjA5OTA2MTExMn0.R3wkUVxoNDidp7AfJ0vid58PifvCit08MuugdNNwq7g';

const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey);

// Sample transfer data (will be replaced with real DB later)
const sampleTransfers = [ /* your existing sample data */ ];

// Current user
let currentUser = null;

// Render transfers (same as before)
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

// Auth Functions
async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('auth-message');

    if (!email.endsWith('@usps.gov')) {
        messageEl.textContent = "Please use your @usps.gov email";
        messageEl.style.color = "red";
        return;
    }

    try {
        // Try to sign in first
        let { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            // If not found, sign up
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
            if (signUpError) throw signUpError;
            messageEl.textContent = "Account created! Check your email to confirm.";
            messageEl.style.color = "green";
        } else {
            currentUser = data.user;
            messageEl.textContent = "Login successful!";
            messageEl.style.color = "green";
            updateAuthUI();
            setTimeout(hideLoginModal, 1500);
        }
    } catch (err) {
        messageEl.textContent = "Error: " + err.message;
        messageEl.style.color = "red";
    }
}

function updateAuthUI() {
    const authDiv = document.getElementById('auth-buttons');
    if (currentUser) {
        authDiv.innerHTML = `
            <span style="color:white; margin-right:10px;">Welcome, ${currentUser.email.split('@')[0]}</span>
            <button class="btn-primary" onclick="logout()">Logout</button>
        `;
    }
}

async function logout() {
    await supabase.auth.signOut();
    currentUser = null;
    document.getElementById('auth-buttons').innerHTML = `<button class="btn-primary" onclick="showLoginModal()">Login / Sign Up</button>`;
}

// Modal functions
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
    document.getElementById('auth-message').textContent = '';
}

function hideLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTransfers(sampleTransfers);
    initMap();
    initAnimation();

    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            currentUser = session.user;
            updateAuthUI();
        }
    });
});
function testJS() {
    alert("JavaScript is working! ✅");
}
