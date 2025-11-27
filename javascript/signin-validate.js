
document.addEventListener('DOMContentLoaded', () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const form = document.getElementById('signin-form');

    if (!email || !password || !form) return;

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const mail = (email.value || '').trim();
        const pass = password.value || '';

        if (!mail) {
            Swal.fire({confirmButtonColor: '#e50914', icon: 'error', title: 'Missing email', text: 'Please enter your email address.' }).then(() => email.focus());
            return;
        }
        if (!emailRe.test(mail)) {
            Swal.fire({confirmButtonColor: '#e50914', icon: 'error', title: 'Invalid email', text: 'Please enter a valid email (example@example.com).' }).then(() => email.focus());
            return;
        }

        if (!pass) {
            Swal.fire({confirmButtonColor: '#e50914', icon: 'error', title: 'Missing password', text: 'Please enter your password.' }).then(() => password.focus());
            return;
        }

        
        // Check hardcoded credentials
        const VALID_EMAIL = 'zigacb@gmail.com';
        const VALID_PASS = 'Admin123!';

        if (mail === VALID_EMAIL && pass === VALID_PASS) {
            Swal.fire({
                confirmButtonColor: '#e50914',
                icon: 'success',
                title: 'Signed in',
                text: 'Redirecting to Netflix...',
                
            }).then(() => {
                window.location.href = 'https://www.netflix.com';
            });
            // fallback redirect after timer in case then() isn't called
            setTimeout(() => { window.location.href = 'https://www.netflix.com'; }, 1200);
        } else {
            Swal.fire({
                confirmButtonColor: '#e50914',
                icon: 'error',
                title: 'Invalid credentials',
                text: 'Email or password incorrect.'
            }).then(() => password.focus());
        }
    });
});