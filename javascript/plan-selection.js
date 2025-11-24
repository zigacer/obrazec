
(function(){
    const plans = Array.from(document.querySelectorAll('#main .plan'));
    const nextBtn = document.getElementById('next-btn');

    if (!plans.length) return;

    
    plans.forEach(p => {
        p.setAttribute('tabindex', '0');
        p.setAttribute('role', 'button');
    });

    function selectPlan(target) {
        plans.forEach(p => p.classList.remove('selected'));
        target.classList.add('selected');
       
        const planName = target.querySelector('.plan-name h2')?.textContent?.trim() || '';
        localStorage.setItem('selectedPlan', planName);
    }

    plans.forEach(p => {
        p.addEventListener('click', () => selectPlan(p));
        p.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectPlan(p);
            }
        });
    });

    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const selected = document.querySelector('#main .plan.selected');
            if (!selected) {
                Swal.fire({
                    confirmButtonColor: '#e50914',
                    icon: 'warning',
                    title: 'No plan selected',
                    text: 'Please select a plan before continuing.',
                    confirmButtonText: 'OK'
                }).then(() => {
                    
                    const first = document.querySelector('#main .plan');
                    if (first) first.focus();
                });
                return;
            }

            Swal.fire({
                confirmButtonColor: '#e50914',
                icon: 'success',
                title: 'Plan selected',
                text: 'Redirecting...',
                showConfirmButton: false,
                timer: 900,
                willClose: () => {
                    
                    window.location.href = 'payment.html';
                }
            });
        });
    }
})();