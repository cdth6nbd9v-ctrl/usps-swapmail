// Basic functions
function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

function hideLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function fakeLogin() {
    alert("🎉 Logged in successfully! (Demo)");
    hideLoginModal();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ SwapMail loaded successfully!");
});
