document.addEventListener('DOMContentLoaded', () => {
    const email = document.getElementById('email');
    const form = document.getElementById('email-form');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form || !email) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const value = (email.value || '').trim();

        if (!value) {
            Swal.fire({
                confirmButtonColor: '#e50914',
                icon: 'error',
                title: 'Missing email',
                text: 'Please enter your email address.'
            }).then(() => email.focus());
            return;
        }

        if (!emailRe.test(value)) {
            Swal.fire({
                confirmButtonColor: '#e50914',
                icon: 'error',
                title: 'Invalid email',
                text: 'Please enter a valid email (example@example.com).'
            }).then(() => email.focus());
            return;
        }

       
        const href = form.getAttribute('action') || 'choose.html';
        Swal.fire({
            confirmButtonColor: '#e50914',
            icon: 'success',
            title: 'Email OK',
            text: 'Redirecting...'
        }).then(() => {
            window.location.href = href;
         });
    });

    email.addEventListener('input', () => {
        
    });
});