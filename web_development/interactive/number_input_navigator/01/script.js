

document.getElementById('check-btn').addEventListener('click', function() {
    const userGuess = Number(document.getElementById('guess-input').value);
    let resultText = '';
    // alert('fuck you guys');

    let moDulus = userGuess%2;
    
    if(moDulus === 0) {
        resultText = 'This is an Even number!';
        document.querySelector('body').style.backgroundColor = 'green';
    }else  {
        resultText = 'This is an Odd nummber!.';
        document.querySelector('body').style.backgroundColor = 'red';
    }

    document.getElementById('result').innerHTML = resultText;
});