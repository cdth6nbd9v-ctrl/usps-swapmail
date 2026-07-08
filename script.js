const supabaseUrl = 'https://agfkbgktzqydbcbxgrou.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZmtiZ2t0enF5ZGJjYnhncm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0ODUxMTIsImV4cCI6MjA5OTA2MTExMn0.R3wkUVxoNDidp7AfJ0vid58PifvCit08MuugdNNwq7g';

const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey);

let currentUser = null;

function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

function hideLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('auth-message');

    if (!email || !password) {
        messageEl.textContent = "Please enter email and password";
        return;
    }

    try {
        let { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            // Try signup
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
            if (signUpError) throw signUpError;
            messageEl.textContent = "Account created! Please check your email.";
            messageEl.style.color = "green";
        } else {
            currentUser = data.user;
            messageEl.textContent = "Login successful!";
            messageEl.style.color = "green";
            setTimeout(() => {
                hideLoginModal();
                updateAuthUI();
            }, 1000);
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
            <span style="color:white;">Hi, ${currentUser.email}</span>
            <button class="btn-primary" onclick="logout()">Logout</button>
        `;
    }
}

async function logout() {
    await supabase.auth.signOut();
    currentUser = null;
    document.getElementById('auth-buttons').innerHTML = `<button class="btn-primary" onclick="showLoginModal()">Login / Sign Up</button>`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ SwapMail with Auth loaded!");
});
