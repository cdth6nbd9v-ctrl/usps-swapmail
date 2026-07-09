let currentUser = null;

function showLoginModal() {
    document.getElementById('login-modal').style.display = 'flex';
}

function hideLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

function handleAuth() {
    alert("handleAuth called! Good progress!");
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ SwapMail loaded!");
});
