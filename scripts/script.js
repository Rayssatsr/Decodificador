document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const inputText = document.getElementById('input-text');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const encodedText = document.getElementById('encoded-text');
    const copyBtn = document.getElementById('copy-btn');
    const copyModal = document.getElementById('copy-modal');

    sendBtn.addEventListener('click', processText);
    inputText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            processText();
        }
    });

    encryptBtn.addEventListener('click', () => {
        let text = encodedText.textContent;
        if (validateInput(text)) {
            let encoded = encrypt(text);
            encodedText.textContent = encoded;
        } else {
            alert('Por favor, insira apenas letras minúsculas, sem acentos ou caracteres especiais.');
        }
    });

    decryptBtn.addEventListener('click', () => {
        let text = encodedText.textContent;
        if (validateInput(text)) {
            let decoded = decrypt(text);
            encodedText.textContent = decoded;
        } else {
            alert('Texto codificado contém caracteres inválidos.');
        }
    });

    copyBtn.addEventListener('click', () => {
        copyToClipboard(encodedText.textContent);
        encodedText.textContent = '';
    });

    function processText() {
        const text = inputText.value.trim().toLowerCase();
        if (text === '') {
            alert('O campo de texto está vazio. Por favor, insira algum texto.');
            return;
        }
        if (validateInput(text)) {
            encodedText.textContent = text;
            inputText.value = '';
            inputText.placeholder = '';
        } else {
            alert('Por favor, insira apenas letras minúsculas, sem acentos ou caracteres especiais.');
        }
    }

    function encrypt(text) {
        const map = {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        };
        return text.replace(/[eioua]/g, match => map[match]);
    }

    function decrypt(text) {
        const map = {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        };
        return text.replace(/enter|imes|ai|ober|ufat/g, match => map[match]);
    }

    function validateInput(text) {
        return /^[a-z\s]*$/.test(text);
    }

    function copyToClipboard(text) {
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                showModal(copyModal);
            }).catch(err => {
                console.error('Erro ao copiar o texto: ', err);
            });
        } else {
            alert('Não há texto para copiar.');
        }
    }

    function showModal(modal) {
        modal.classList.remove('hidden');
        modal.classList.add('visible');

        setTimeout(() => {
            modal.classList.remove('visible');
            modal.classList.add('hidden');
        }, 2000);
    }
});
