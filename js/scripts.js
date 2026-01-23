function generatePasswrd(size, chartTypes) {
  let password = '';
  for (let i = 0; i < size; i++) {
    password += randonChartype(chartTypes);
  }
  return password;
}

function randonChartype(chartTypes) {
  return chartTypes[Math.floor(Math.random() * chartTypes.length)];
}

function message(text, status = 'success') {
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: status === 'success' ? '#033B3D' : '#53736A',
      boxShadow: 'none'
    }
  }).showToast();
}

function copyToClipboardFallback(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Evita que o textarea afete o layout ou scroll
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        // Deprecated but necessary fallback for non-secure contexts (HTTP)
        const successful = document.execCommand('copy'); // NOSONAR
        if (successful) {
            message('Senha copiada com sucesso!', 'success');
        } else {
            message('Não foi possível copiar a senha.', 'warning');
        }
    } catch (err) {
        console.error('Erro ao copiar (fallback):', err);
        message('Erro ao copiar senha.', 'warning');
    }

    textArea.remove();
}

function generatePronuneablePasswords(size, includeUppercase, includeLowercase) {
  const vowelsLowercase = 'aeiou';
  const vowelsUppercase = 'AEIOU';
  const consonantsLowercase = 'bcdfghjklmnpqrstvwxyz';
  const consonantsUppercase = 'BCDFGHJKLMNPQRSTVWXYZ';

  let password = '';
  let useConsonants = true;

  // Inicializar as strings de consoantes e vogais com base nas opções de maiúsculas/minúsculas
  let consonants = '';
  let vowels = '';

  // Definir consoantes e vogais de acordo com as opções de maiúsculas/minúsculas
  if (includeUppercase && includeLowercase) {
    consonants = consonantsLowercase + consonantsUppercase;
    vowels = vowelsLowercase + vowelsUppercase;
  } else if (includeUppercase) {
    consonants = consonantsUppercase;
    vowels = vowelsUppercase;
  } else if (includeLowercase) {
    consonants = consonantsLowercase;
    vowels = vowelsLowercase;
  }

  // Verificar se há consoantes e vogais válidas
  if (!consonants || !vowels) {
      message('Nenhuma consoante ou vogal disponível. Verifique as opções selecionadas.', 'warning');
      return null;
  }

  // Gerar senha alternando entre consoantes e vogais
  for (let i = 0; i < size; i++) {
    if (useConsonants) {
      password += consonants[Math.floor(Math.random() * consonants.length)];
    } else {
      password += vowels[Math.floor(Math.random() * vowels.length)];
    }
    useConsonants = !useConsonants;
  }

  return password;
}

// DOM Elements and Event Listeners
const generateBtn = document.querySelector("#generate");
const copyBtn = document.querySelector("#copy");
const passwordSpan = document.querySelector("#password");
const sizeInput = document.querySelector("#size");
const sizeText = document.querySelector("#size-input");

const uppercaseEl = document.querySelector("#uppercase");
const lowercaseEl = document.querySelector("#lowercase");
const numbersEl = document.querySelector("#numbers");
const symbolsEl = document.querySelector("#symbols");

const pronunceableEl = document.querySelector("#pronunceable");
const readableEl = document.querySelector("#readable");
const getAllCharactersEl = document.querySelector("#getAllCharacters");

const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numbersChars = "0123456789";
const symbolsChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// Remove ambiguous characters for readable passwords
const readableUppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // No I, O
const readableLowercase = "abcdefghjkmnpqrstuvwxyz"; // No l
const readableNumbers = "23456789"; // No 0, 1

function getChartTypes() {
    let chartTypes = "";
    const isReadable = readableEl.checked;
    
    if (uppercaseEl.checked) chartTypes += isReadable ? readableUppercase : uppercaseChars;
    if (lowercaseEl.checked) chartTypes += isReadable ? readableLowercase : lowercaseChars;
    if (numbersEl.checked) chartTypes += isReadable ? readableNumbers : numbersChars;
    if (symbolsEl.checked) chartTypes += symbolsChars; // Symbols are same for both
    
    return chartTypes;
}

if (generateBtn) {
    generateBtn.addEventListener("click", () => {
        const size = sizeInput.value;
        let password = "";

        if (pronunceableEl.checked) {
            const includeUpper = uppercaseEl.checked;
            const includeLower = lowercaseEl.checked;
            password = generatePronuneablePasswords(size, includeUpper, includeLower);
            if (!password) return; 
        } else {
            const chartTypes = getChartTypes();
            if (!chartTypes) {
                message("Selecione pelo menos um tipo de caractere!", "warning");
                return;
            }
            password = generatePasswrd(size, chartTypes);
        }
        
        passwordSpan.textContent = password;
    });
}

if (copyBtn) {
    copyBtn.addEventListener("click", () => {
        const password = passwordSpan.textContent;
        if (!password) return;

        if (navigator.clipboard?.writeText) {
             navigator.clipboard.writeText(password)
                .then(() => message("Senha copiada com sucesso!", "success"))
                .catch((err) => {
                    console.error('Clipboard API failed, fallback:', err);
                    copyToClipboardFallback(password);
                });
        } else {
            copyToClipboardFallback(password);
        }
    });
}

if (sizeInput && sizeText) {
    sizeInput.addEventListener("input", () => {
        sizeText.value = sizeInput.value;
    });
}
