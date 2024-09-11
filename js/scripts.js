document.addEventListener('DOMContentLoaded', function() {
    function getChartTypes() {
        const includeNumbers = document.querySelector('#numbers').checked;
        const includeSymbols = document.querySelector('#symbols').checked;
        const includeUppercase = document.querySelector('#uppercase').checked;
        const includeLowercase = document.querySelector('#lowercase').checked;

        const chartTypes = [];

        if (includeNumbers) {
            chartTypes.push('0123456789');
        }
        if (includeSymbols) {
            chartTypes.push('!@#$%^&*()+?><:{}[]');
        }
        if (includeUppercase) {
            chartTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
        }
        if (includeLowercase) {
            chartTypes.push('abcdefghijklmnopqrstuvwxyz');
        }

        return chartTypes;
    }

    function getPasswordsize() {
      const size = document.querySelector('#size').value;
      if (isNaN(size) || size < 4 || size > 50) {
        message('Tamanho inválido, digite um número entre 4 e 50', 'warning');
        return null;
      }
      return size;
    }

    function generatePasswrd(size, chartTypes) {
      let password = '';
      for (let i = 0; i < size; i++) {
        password += randonChartype(chartTypes);
      }
      return password;
    }

    function message(text, status = 'success') {
      Toastify({
        text: text,
        duration: 3000,
        stoponfocus: true,
        close: true,
        style: {
          backgroundColor: status === 'success' ? '#84cc16' : '#dc2626',
          boxShadow: 'none'
        }
      }).showToast();
    }

    function randonChartype(chartTypes) {
      const chart = Math.floor(Math.random() * chartTypes.length);
      return chartTypes[chart][Math.floor(Math.random() * chartTypes[chart].length)];
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

      function generateReablePassword(size, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
        // Define os conjuntos de caracteres fáceis de ler
        let lowercaseChars = 'abcdefghijkmnopqrstuvwxyz';
        let uppercaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        let reableChars = '';

        // Adiciona caracteres ao conjunto com base nas opções de maiúsculas e minúsculas
        if (includeUppercase && includeLowercase) {
            reableChars = lowercaseChars + uppercaseChars;
        } else if (includeUppercase) {
            reableChars = uppercaseChars;
        } else if (includeLowercase) {
            reableChars = lowercaseChars;
        }

        // Verifica se o conjunto de caracteres "fáceis de ler" não está vazio
        if (!reableChars) {
            message('Selecione pelo menos maiúsculas ou minúsculas para gerar a senha.', 'warning');
            return null;
        }

        // Se números estiverem habilitados, adiciona números ao conjunto de caracteres
        if (includeNumbers) {
            reableChars += '0123456789';
        }

        // Se símbolos estiverem habilitados, adiciona símbolos ao conjunto de caracteres
        if (includeSymbols) {
            reableChars += '!@#$%^&*()+?><:{}[]';
        }

        let password = '';

        // Gera a senha com base nos caracteres disponíveis
        for (let i = 0; i < size; i++) {
            password += reableChars[Math.floor(Math.random() * reableChars.length)];
        }

        return password;
    }

    function generateAllCharactersPassword(size, chartTypes) {
      return generatePasswrd(size, chartTypes); // Utiliza a mesma lógica que generatePasswrd
    }

    function generatePassword(size, chartTypes) {
      const pronunceable = document.querySelector('#pronunceable').checked;
      const readable = document.querySelector('#readable').checked;
      const getAllCharacters = document.querySelector('#getAllCharacters').checked;
      const includeUppercase = document.querySelector('#uppercase').checked;
      const includeLowercase = document.querySelector('#lowercase').checked;
      const includeNumbers = document.querySelector('#numbers').checked;
      const includeSymbols = document.querySelector('#symbols').checked;

      if (pronunceable) {
        // Chama a função de senhas pronunciáveis com base nas opções de maiúsculas/minúsculas
        return generatePronuneablePasswords(size, includeUppercase, includeLowercase);
      }

      if (readable) {
       return generateReablePassword(size, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
      }

      if (getAllCharacters) {
        enableAllOptions();
        return generateAllCharactersPassword(size, chartTypes);
      }

      return generatePasswrd(size, chartTypes);
    }

    function enableAllOptions() {
      document.querySelector('#uppercase').disabled = false;
      document.querySelector('#lowercase').disabled = false;
      document.querySelector('#numbers').disabled = false;
      document.querySelector('#symbols').disabled = false;     
      document.querySelector('#readable').disabled = false;
      document.querySelector('#numbers').checked = true;
      document.querySelector('#symbols').checked = true;
    }

    function enableCharacterOptions() {
        document.querySelector('#uppercase').disabled = false;
        document.querySelector('#lowercase').disabled = false;
        document.querySelector('#numbers').disabled = false;
        document.querySelector('#symbols').disabled = false;
    }

    function disableNumbersAndSymbols() {
        document.querySelector('#numbers').disabled = true;
        document.querySelector('#symbols').disabled = true;
        document.querySelector('#numbers').checked = false;
        document.querySelector('#symbols').checked = false;
    }

    document.querySelector('#pronunceable').addEventListener('change', function() {
        if (this.checked) {
            disableNumbersAndSymbols();
        } else {
            enableCharacterOptions();
        }
    });

    document.querySelector('#readable').addEventListener('change', function() {
        if (this.checked) {
            enableCharacterOptions(); // Ativar opções de números e símbolos
        }
    });

   
    document.querySelector('#getAllCharacters').addEventListener('change', function() {
      if (this.checked) {
        enableAllOptions();
      }
    });

    document.querySelector('#generate').addEventListener('click', function () {
      const size = getPasswordsize();
      const chartType = getChartTypes();

      if (!size) return;
      if (!chartType.length && !document.querySelector('#pronunceable').checked && !document.querySelector('#readable').checked) {
        message('Selecione pelo menos um tipo de caractere ou uma opção de senha fácil', 'warning');
        return;
      }

      const password = generatePassword(size, chartType);

      document.querySelector('#password_container').classList.add('show');
      document.querySelector('#password').textContent = password;
    });

    document.querySelector('#copy').addEventListener('click', function () {
      const password = document.querySelector('#password').textContent;

      if (password) {
        navigator.clipboard.writeText(password)
          .then(() => {
            message('Senha copiada com sucesso!', 'success');
          })
          .catch((err) => {
            message('Erro ao copiar senha', 'warning');
            console.error(err);
          });
      } else {
        message('Nenhuma senha gerada', 'warning');
      }
    });
  });
