

function types(value){
    var truthArray = []
    var truth = Number.isInteger(Number(value))
    console.log(truth)
    if (truth == true){
        truthArray.push(value)
    }
    console.log(truthArray)
}

types("a")
console.log(typeof("2"))


