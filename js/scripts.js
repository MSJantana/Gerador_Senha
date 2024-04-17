function getChartTypes(){
    const uppercase = document.querySelector('#uppercase').checked;
    const lowercase = document.querySelector('#lowercase').checked;
    const numbers = document.querySelector('#numbers').checked;
    const specialcaracteres = document.querySelector('#symbols').checked;

    const chartTypes = [];

    if (uppercase) { 
        chartTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    } 
    if (lowercase){
        chartTypes.push('abcdefghijklmnopqrstuvwxyz');    
    }
    if (numbers) {
        chartTypes.push('0123456789');
    }
    if (specialcaracteres) { 
        chartTypes.push('!@#$%^&*()+?><:{}[]');
    }

    return chartTypes;
}

function getPasswordsize() { 
    const size = document.querySelector('#size').value;
    if (isNaN(size) || size < 4 || size > 50) {
       message ('Tamanho inválido, digite um número entre 4 e 50', 'warning');
    }else return size;
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
        style: {
            backgroundColor: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none' 
        }    
       
    }).showToast();
}

function randonChartype(chartTypes) {
    const chart = Math.floor(Math.random() * chartTypes.length);
    return chartTypes [chart][Math.floor(Math.random() * chartTypes[chart].length)];
}


document.querySelector('#generate').addEventListener('click', function() {
    const size = getPasswordsize();
    const chartType = getChartTypes();

    if (!size) { 
        return;
    }
    if (!chartType.length) { 
        message('Selecione pelo menos um tipo de caractere', 'warning');
        return;
    }

    const password = generatePasswrd(size, chartType);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = password;
});

document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Senha copiada com sucesso!', "success");
});

