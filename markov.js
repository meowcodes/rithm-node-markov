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
    let chain = {};

    for (let i = 0; i < this.words.length; i++){

      let thisWord = this.words[i].toLowerCase();
      let nextWord = null;

      if(this.words[i+1]){
        nextWord = this.words[i+1].toLowerCase();
      }
      
      // console.log("WORDS!",thisWord, nextWord)

      // drop '.' and change next word to null if end of sentence
      if(thisWord.endsWith('.') || thisWord.endsWith(',')){
        thisWord = thisWord.slice(0,-1);
      } else if(nextWord) {
        if(nextWord.endsWith('.') || nextWord.endsWith(',')){
          nextWord = nextWord.slice(0,-1);
        }
      }

      // add to chain obj
      if(!chain[thisWord]){
        chain[thisWord] = [nextWord];
      }else {
        chain[thisWord].push(nextWord);
      }
    }

    return chain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // pick random word from words list
    const keysArr = Object.keys(this.chain)
    let randomWord = keysArr[Math.floor(Math.random() * keysArr.length)];

    // assign that word to a string called newStory. Capitalize 1st letter of first word.
    let newStory = randomWord[0].toUpperCase() + randomWord.slice(1);

    let counter = 1;

    let currWord = randomWord;

    while(counter<numWords) {
      let nextWordsArr = this.chain[currWord.toLowerCase()];
      // console.log(`current word: ${currWord}, next word array: ${nextWordsArr}`)
      let nextWord = nextWordsArr[Math.floor(Math.random() * nextWordsArr.length)];
      if (!nextWord) {
        break;
      }
      newStory += ` ${nextWord}`;
      if (!this.chain[nextWord]) {
        break;
      }
      currWord = nextWord;
      counter++;
    }

    newStory += '.';

    return newStory

    // while loop through the chains to generate a story. Stop at null OR when max num words has been reached.
    // Make sure to add period before returning story
  }
}

module.exports = MarkovMachine
