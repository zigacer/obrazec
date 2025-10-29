

(function(){
  const card = document.getElementById('card-number');
  const cvv  = document.getElementById('cvv');

  if (card) {
   
    card.addEventListener('keydown', (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (
        ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key) ||
        (ctrl && ['a','c','v','x'].includes(e.key.toLowerCase()))
      ) return;
      if (!/^\d$/.test(e.key)) e.preventDefault();
    });

    card.addEventListener('input', (e) => {
      const el = e.target;
      const digits = el.value.replace(/\D/g,'').slice(0,16); 
      const parts = digits.match(/.{1,4}/g) || [];
      el.value = parts.join('-');
    });

    card.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text') || '';
      const digits = text.replace(/\D/g,'').slice(0,16);
      const parts = digits.match(/.{1,4}/g) || [];
      card.value = parts.join('-');
    });
  }

  if (cvv) {
    cvv.addEventListener('keydown', (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (
        ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key) ||
        (ctrl && ['a','c','v','x'].includes(e.key.toLowerCase()))
      ) return;
      if (!/^\d$/.test(e.key)) e.preventDefault();
    });

    cvv.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g,'').slice(0,3);
    });

    cvv.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text') || '';
      e.target.value = text.replace(/\D/g,'').slice(0,3);
    });
  }
})();


(function(){
  const expiry = document.getElementById('expiry-date');
  if (!expiry) return;

  expiry.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0,4); 
    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    e.target.value = v;
  });

  expiry.addEventListener('blur', (e) => {
    const val = e.target.value;
    const m = val.match(/^(\d{2})\/(\d{2})$/);
    if (!m) {
      e.target.setCustomValidity('Enter expiry as MM/YY');
      return;
    }
    const month = parseInt(m[1], 10);
    if (month < 1 || month > 12) {
      e.target.setCustomValidity('Month must be 01–12');
    } else {
      e.target.setCustomValidity('');
    }
  });

  expiry.addEventListener('focus', (e) => e.target.setCustomValidity(''));
})();