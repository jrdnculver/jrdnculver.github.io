
class JeopardyBoard{
    constructor(){
        this.jeopardy = [];
        this.double_jeopardy = [];
        this.final_jeopardy = [];
        this.tiebreaker = [];
    }

    GameStyles(fullDataset){
        fullDataset.foreach (v =>{
            if (v.round == 'Jeopardy!'){
                array_push(this.jeopardy, v);
            }
            else if (v.round == 'Double Jeopardy!'){
                array_push(this.double_jeopardy, v);
            }
            else if (v.round == 'Final Jeopardy!'){
                array_push(this.final_jeopardy, v);
            }
            else{
                array_push(this.tiebreaker, v);
            }
        })
    }
}
