function getChartTypes(){
    const uppercase = document.querySelector('#uppercase').checked;
    const lowercase = document.querySelector('#lowercase').checked;
    const numbers = document.querySelector('#numbers').checked;
    const specialcaracteres = document.querySelector('#strings').checked;

    console.log('uppercase', uppercase);

}

document.querySelector('#generate').addEventListener('click', function() {
    getChartTypes();
});
