/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chain = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {}

    for (let i = 0; i < this.words.length; i++){

      let thisWord = this.words[i].toLowerCase()
      let nextWord = null

      if(this.words[i+1]){
        nextWord = this.words[i+1].toLowerCase()
      }
      
      // drop '.' and change next word to null if end of sentence
      if(thisWord.endsWith('.') || thisWord.endsWith(',')){
        thisWord = thisWord.slice(0,-1)
      }else {
        if(nextWord.endsWith('.') || nextWord.endsWith(',')){
          nextWord = nextWord.slice(0,-1)
        }
      }

      // add to chain obj
      if(!chain[thisWord]){
        chain[thisWord] = [nextWord]
      }else {
        chain[thisWord].push(nextWord)
      }
    }

    return chain;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}


module.exports = MarkovMachine