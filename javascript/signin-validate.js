
document.addEventListener('DOMContentLoaded', () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const signinBtn = document.getElementById('signin-btn');

    if (!email || !password || !signinBtn) return;

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRe = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

    signinBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const mail = (email.value || '').trim();
        const pass = password.value || '';

        if (!mail) {
            Swal.fire({ icon: 'error', title: 'Missing email', text: 'Please enter your email address.' }).then(() => email.focus());
            return;
        }
        if (!emailRe.test(mail)) {
            Swal.fire({ icon: 'error', title: 'Invalid email', text: 'Please enter a valid email (example@example.com).' }).then(() => email.focus());
            return;
        }

        if (!pass) {
            Swal.fire({ icon: 'error', title: 'Missing password', text: 'Please enter your password.' }).then(() => password.focus());
            return;
        }
        if (!passRe.test(pass)) {
            Swal.fire({
                icon: 'error',
                title: 'Weak password',
                html: 'Password must be at least 6 characters and include:<br>- an uppercase letter<br>- a number<br>- a special character'
            }).then(() => password.focus());
            return;
        }

        
        Swal.fire({
            icon: 'success',
            title: 'You are signed in',
            showConfirmButton: true
        });
    });
});