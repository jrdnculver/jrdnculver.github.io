var game_list = sessionStorage.getItem('game_list');
game_list = JSON.parse(game_list);
console.log(game_list);

var number = sessionStorage.getItem('number');
console.log(number);
number = parseInt(number);

document.getElementById('question').innerHTML = game_list[0][number]['Question'];
document.getElementById('answer').innerHTML = game_list[0][number]['Answer'];

function closeWindow(){
    
    window.close();
}

function showAnswer(){
    document.getElementById('answer').style.display = 'block';
}

