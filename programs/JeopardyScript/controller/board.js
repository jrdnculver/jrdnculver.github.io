var game_list = sessionStorage.getItem('game_list');
game_list = JSON.parse(game_list);

setGameHeaderButtons(game_list);
setGameButtons(game_list);

var bns1 = document.getElementsByClassName("Pressed1");
var bns2 = document.getElementsByClassName("Pressed2");
var bns3 = document.getElementsByClassName("Pressed3");
var bns4 = document.getElementsByClassName("Pressed4");
var bns5 = document.getElementsByClassName("Pressed5");

var bns = [];
bns = addItemsToList(Array.from(bns1), bns);
bns = addItemsToList(Array.from(bns2), bns);
bns = addItemsToList(Array.from(bns3), bns);
bns = addItemsToList(Array.from(bns4), bns);
bns = addItemsToList(Array.from(bns5), bns);



for (i = 0; i < bns.length; i++) {
  bns[i].addEventListener("click", function() {
    var button = document.getElementById(this.id);
    sessionStorage.setItem('number', this.id);
    button.setAttribute('id', 'invisible');

    var rows = ['row1','row2','row3','row4','row5','row6'];

    if (window.innerWidth < 600){
        var header = document.getElementsByClassName('header')
        header = Array.from(header);

        rows.forEach(element => {
            var numbers = document.getElementsByClassName(element)
            numbers = Array.from(numbers);
            numbers.forEach(elements => {
                elements.style.display = 'none';
            })
        })
    

        header.forEach(element => {
            element.style.display = 'block';
        })
    }
    
    window.open("../views/questions.html"); 
    });
}

var ids = [];
ids = document.getElementsByClassName("headers");
ids = Array.from(ids);
console.log(ids);


var show_number = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'];
for (i = 0; i < ids.length; i++) {
    ids[i].addEventListener("click", function() {
        var hide_head = [];
        hide_head = document.getElementsByClassName("header");
        hide_head = Array.from(hide_head);
        var width = window.innerWidth < 600;
        if(width){
            var id = this.id.charAt(this.id.length - 1);
            hide_head.forEach(element => {
                console.log(element);
                element.style.display = 'none';
            });

            var show_cat_numbers = [];
            show_cat_numbers = document.getElementsByClassName(show_number[id - 1]);
            show_cat_numbers = Array.from(show_cat_numbers);

            show_cat_numbers.forEach(element => {
                element.style.display = 'block';
            })

            document.getElementById('category_btn').style.display = 'block';
        }

    });
}
 
function createBoardHeaders(game_list){
    headers = ['header1', 'header2', 'header3', 'header4','header5','header6']
    x = 0;
    headers.forEach(element => {
        var header = document.getElementById(element);
        header.innerHTML = game_list[0][x]['Category'];
        x+=1;
    });
}

function setGameHeaderButtons(game_list){
    headers = ['header_btn1', 'header_btn2', 'header_btn3', 'header_btn4','header_btn5','header_btn6']
    x = 0;
    headers.forEach(element => {
        var header = document.getElementById(element);
        header.innerHTML = game_list[0][x]['Category'];
        x+=1;
    });
}

function setGameButtons(game_list){
    var x = 0;
    while (x < 30){
        var button = document.getElementById(x);
        button.innerHTML = game_list[0][x]['Value'];
        x += 1;
    }
}

function addItemsToList(items_to_add, list_added_to){
    items_to_add.forEach(element => {
        list_added_to.push(element)
    })

    return list_added_to;
}

