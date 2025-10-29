

(function () {
  const SWEETALERT_CDN = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';

  function loadSwal() {
    return new Promise((resolve) => {
      if (window.Swal) return resolve(window.Swal);
      const s = document.createElement('script');
      s.src = SWEETALERT_CDN;
      s.onload = () => resolve(window.Swal);
      s.onerror = () => resolve(null);
      document.head.appendChild(s);
    });
  }

  function onlyDigits(str) {
    return (str || '').replace(/\D/g, '');
  }

  function hasLetters(str) {
    return /[A-Za-zÀ-ž]/.test(str || '');
  }

 
  function validateCard(value) {
    const digits = onlyDigits(value);
    if (digits.length < 12 || digits.length > 19) {
      return 'Please enter the card number using digits (12–19 digits).';
    }
    return '';
  }

  function validateExpiry(value) {
    if (!value || !/^\d{1,2}\/\d{2}$/.test(value)) {
      return 'Enter expiry as MM/YY (e.g. 07/26).';
    }
    return '';
  }

  function validateCvv(value) {
    const digits = onlyDigits(value);
    if (digits.length < 3 || digits.length > 4) {
      return 'Enter a CVV with 3 or 4 digits.';
    }
    return '';
  }

  function validateName(value) {
    if (!value || !hasLetters(value) || value.trim().length < 2) {
      return 'Enter the name on the card.';
    }
    return '';
  }

  function gatherErrors(fields) {
    const errors = [];
    if (!fields.card) errors.push('Card field missing.');
    else {
      const e = validateCard(fields.card.value);
      if (e) errors.push(e);
    }

    if (!fields.expiry) errors.push('Expiry field missing.');
    else {
      const e = validateExpiry(fields.expiry.value);
      if (e) errors.push(e);
    }

    if (!fields.cvv) errors.push('CVV field missing.');
    else {
      const e = validateCvv(fields.cvv.value);
      if (e) errors.push(e);
    }

    if (!fields.name) errors.push('Name field missing.');
    else {
      const e = validateName(fields.name.value);
      if (e) errors.push(e);
    }

    if (!fields.agree) errors.push('Agreement checkbox missing.');
    else if (!fields.agree.checked) errors.push('You must agree to the Terms and Privacy statement.');

    return errors;
  }

  function formatErrorsHtml(errors) {
    return `<ul style="text-align:left;margin:0;padding-left:1.1rem;">${errors.map(e => `<li>${e}</li>`).join('')}</ul>`;
  }

  async function showResult(success, errors) {
    const Swal = await loadSwal();
    if (!Swal) {
      if (success) alert('Success: payment inputs look OK.');
      else alert('Please fix:\n' + (errors || []).join('\n'));
      return;
    }

    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'All set',
        html: 'Your account is ready to go!',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please fix the following',
        html: formatErrorsHtml(errors),
        confirmButtonText: 'OK'
      });
    }
  }

  function init() {
    document.addEventListener('click', async (ev) => {
      const btn = ev.target.closest && ev.target.closest('#start-membership');
      if (!btn) return;

      ev.preventDefault();

      const fields = {
        card: document.getElementById('card-number'),
        expiry: document.getElementById('expiry-date'),
        cvv: document.getElementById('cvv'),
        name: document.getElementById('name'),
        agree: document.getElementById('agree')
      };

      const errors = gatherErrors(fields);
      if (errors.length === 0) {
        await showResult(true);
      } else {
        await showResult(false, errors);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();