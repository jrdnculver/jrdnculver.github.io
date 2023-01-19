async function toBoard(){
    data = new Data();

    var game_list = [];
    var set = await data.readJSON();
    var show_number = data.getShowNumbers(set);
    var max = show_number.length;
    var min = 1;

    var random = data.getAvailableNumbers(show_number, max, min);
    var selection = data.getShowNumberSelection(show_number, random);
    game_list = data.getGameList(set, selection);
    sessionStorage.setItem('data', JSON.stringify(data));
    sessionStorage.setItem('game_list', JSON.stringify(game_list));

    window.location.href = "../JeopardyScript/views/board.html"
}

class Data{

    constructor(){

    }

    async readJSON(){
        var data;

        let fee = await fetch("data/data.json");
        data = await fee.json();
        return data;
    }

    getAvailableNumbers(show_number, max, min){
        var random;
        
        while(true){
            random = Math.round(this.getRandomNumber(max, min));
            if(random in show_number){
                return random;
            }
        }
    }

    getShowNumbers(data){
        var show_number = [];
        var len = data.length;
        var i = 0;
        while(i < len){
            var value = data[i]['Show Number'];
            if(show_number.includes(value)){
                i+=1;
                continue
            }
            else{
                i+=1;
                show_number.push(value);
            }
        }

        return show_number;
    }

    getRandomNumber(max, min){
        return Math.random() * (max - min) + min;
    }

    getShowNumberSelection(show_number, random){
        return show_number[random];
    }

    getGameList(data, selection){
        var x = 0;

        var game_list = [];

        var jeopardy = [];
        var double_jeopardy = [];
        var final_jeopardy = [];

        while(x < data.length){
            if(data[x]['Show Number'] == selection){

        
                if(data[x]['Round'] == 'Jeopardy!'){
                    jeopardy.push(data[x]);
                    x += 1;
                }
                else if(data[x]['Round'] == 'Double Jeopardy!'){
                    double_jeopardy.push(data[x]);
                    x += 1;
                }
                else if(data[x]['Round'] == 'Final Jeopardy!'){
                    final_jeopardy.push(data[x]);
                    x += 1;
                }
                else{
                    console.log('Shouldnt be here');
                    x += 1;
                    continue;
                }

            }
            else{
                x += 1;
                continue;
            }
        }

        game_list.push(jeopardy);
        game_list.push(double_jeopardy);
        game_list.push(final_jeopardy);

        return game_list;
    }

    onButtonPress(){

    }

}