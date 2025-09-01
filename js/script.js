const numericInput = document.getElementById('phone-number');
const message = document.getElementById('message');

numericInput.addEventListener('input', function(e) {
    // Remove any non-numeric characters
    this.value = this.value.replace(/[^0-9]/g, '');
});

numericInput.addEventListener('keydown', function(e) {
    // Allow special keys: backspace, delete, tab, escape, enter, navigation
    if ([46, 8, 9, 27, 13, 37, 38, 39, 40].includes(e.keyCode) ||
        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) || 
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)) {
        return;
    }
    
    // Prevent non-numeric keys
    if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
        showMessage("Only numbers are allowed!");
    }
});

numericInput.addEventListener('paste', function(e) {
    // Get pasted data and validate
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) {
        e.preventDefault();
        showMessage("Pasted content contains non-numeric characters!");
    }
});

function showMessage(msg) {
    message.textContent = msg;
    numericInput.classList.add('invalid');
    
    setTimeout(() => {
        message.textContent = '';
        numericInput.classList.remove('invalid');
    }, 2000);
}