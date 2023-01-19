
class JeopardyKeys{
    key;
    
    boardValues = [];

    constructor(){
        this.key = "";
        this.boardValues = [];
    }

    GetJeopardyKey(board, keys){
        random = array_rand(board.jeopardy, 1);

        keys.key = board.jeopardy[$random].showing;

        return keys;
        
    }

    GetDoubleJeopardyKeys(board, keys){
        random = array_rand(board.double_jeopardy, 1);

        keys.key = board.double_jeopardy[random[0]].showing;

        return keys;
    }

    GetJeopardyQuestions(board, keys){
        board.jeopardy.foreach(v =>{
            
            if(v.showing == keys.key){
                array_push(keys.boardValues, v);
            }
        })

        return $keys;
    }


}