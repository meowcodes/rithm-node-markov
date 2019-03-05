/** Command-line tool to generate Markov text. */
const fs = require("fs");
const axios = require("axios");

const Markov = require("./markov");

async function makeText(argv){
    let type = argv[2]
    let path = argv[3]

    // read the input
    let text = await readInput(type, path)
    // console.log("TEXT HERE", text)

    // create instance of Markov
    let instance = new Markov(text)

    // call .makeText()
    console.log(instance.makeText())
}

async function readInput(type, path){

    if(type==="file"){
        return  getFileText(path) 
    }else if(type==="url"){
        let text = await getWebText(path)
        // console.log(text)
        return text.data
    }
}

function getFileText(path){
    fs.readFile(path, "utf8", function(error, data){
        if (error) {
            console.log(error);
            process.exit(1);
        }
        return data
    }) 
}

async function getWebText(path){
    try {
        return await axios.get(path);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}


makeText(process.argv)