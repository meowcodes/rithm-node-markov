const Markov = require('./markov')

const TEXT = 'I would not, could not in a tree. Not in a car! You let me be. I do not like them in a box. I do not like them with a fox I do not like them in a house I do mot like them with a mouse I do not like them here or there. I do not like them anywhere. I do not like green eggs and ham. I do not like them, Sam-I-am.'


describe("makeChains", function(){
    let instance;
    beforeAll(function(){
        instance = new Markov(TEXT);
    })
    it("makes an object w/ keys and arrays of the following words", function(){
      expect(typeof instance.makeChains()).toEqual('object') 
      expect(instance.chain['do']).toEqual([ 'not', 'not', 'not', 'mot', 'not', 'not', 'not', 'not']) 
    })
  })

describe("makeText", function(){
    let instance;
    beforeAll(function(){
        instance = new Markov(TEXT);
    })
    it("returns a string", function(){
        expect(typeof instance.makeText()).toEqual('string') 
    })

    it("returns a string shorter than the specified number of words", function(){
        let words = instance.makeText().split(' ')
        expect(words.length).toBeLessThanOrEqual(100) 
        let words2 = instance.makeText(30).split(' ')
        expect(words2.length).toBeLessThanOrEqual(30) 
    })

    it("returns a string with letter of first word capitalized", function(){
        let firstLetter = instance.makeText()[0]
        expect(firstLetter).toEqual(firstLetter.toUpperCase()) 
    })

    it("returns a string with letter of first word capitalized", function(){
        let story = instance.makeText()
        let lastCharacter = story.slice(-1)
        expect(lastCharacter).toEqual('.') 
    })
  })

  describe("constructor", function(){
    let instance;
    beforeAll(function(){
        instance = new Markov(TEXT);
    })
    it("returns an instance with a key of words that is of type array", function(){
        expect(Array.isArray(instance.words)).toEqual(true);
    })
    it("returns an instance with a key of words that is of type object", function(){
        expect(typeof instance.chain).toEqual('object');
    })
  })