function getChartTypes(){
    const uppercase = document.querySelector('#uppercase').checked;
    const lowercase = document.querySelector('#lowercase').checked;
    const numbers = document.querySelector('#numbers').checked;
    const specialcaracteres = document.querySelector('#symbols').checked;

    const ChartTypes = [];

    if (uppercase) { 
        ChartTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    } 
    if (lowercase){
        ChartTypes.push('abcdefghijklmnopqrstuvwxyz');    
    }
    if (numbers) {
        ChartTypes.push('0123456789');
    }
    if (specialcaracteres) { 
        ChartTypes.push('?/~^{}[]!@#$%&*()_-+=.,:;');
    }

    return ChartTypes;
}

function getPasswordsize() { 
    const size = document.querySelector('#size').value;
    if (isNaN(size) || size < 4 || size > 50) {
       message ('Tamanho inválido, digite um número entre 4 e 50', 'warning');
    }else return size;
}

function generatePasswrd(size, ChartTypes) {
    let password = '';
    for (let i = 0; i < size; i++) {
        password += randonChartype(ChartTypes);
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


function randonChartype(ChartTypes) {
    const chart = Math.floor(Math.random() * ChartTypes.length);
    return ChartTypes [chart][Math.floor(Math.random() * ChartTypes[chart].length)];
}


document.querySelector('#generate').addEventListener('click', function() {
    //console.log(randonChartype(getChartTypes()));
    //console.log(generatePasswrd(getPasswordsize(),getChartTypes()));
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

