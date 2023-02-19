// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};
// Factory Function for the quick creation of specimen models
const pAequorFactory = (number, DNABaseArr) => {
  {
    return {
      specimenNum: number,
      dna: DNABaseArr,

      // Mutates the current specimen
      mutate() {
        let randomNumber = Math.floor(Math.random() * 15);
        let randomMutation = returnRandBase();
        if (this.dna[randomNumber] !== randomMutation) { this.dna[randomNumber] = randomMutation } else {
          do {
            randomNumber = Math.floor(Math.random() * 15);
            randomMutation = returnRandBase();
            this.dna[randomNumber] = randomMutation;
          } while (this.dna[randomNumber] === randomMutation)
        }
        console.log('mutated DNA sequence is:');
        console.log(this.dna);
        return this.dna;
      },

      // compares the percentage of matching dna between two specimens
      compareDna(anotherSpecimen) {
        let fraction = 0;
        for (let i = 0; i < 15; i++) {
          if (this.dna[i] === anotherSpecimen.dna[i]) {
            fraction += 1;
          }
        }
        function percentage() {
          return Math.ceil((100 * fraction) / 15);
        }
        console.log(`specimen #${this.specimenNum} and specimen #${anotherSpecimen.specimenNum} have ${percentage()}% DNA in common`);
      },





      // checks if the specimen is more likely to survive thanks to having 60% or more of the "C" and "G" dna bases
      willItSurvive() {
        let fractionOfCG = 0;
        this.dna.forEach(element => { if (element === ('C' || 'G')) { fractionOfCG += 1 }; });
        if (fractionOfCG > 8) { return true; } else { return false; }
      }
    };
  }
};



// automatically generates 30 indexed specimens with random DNA bases
let specimenArray = [];
const automatedSpecimenMaker = () => {
  for (let i = 1; i <= 30; i++) {
    specimenArray.push(pAequorFactory(i, mockUpStrand()));
  };
  //console.log(specimenArray);
};

//create a random list
automatedSpecimenMaker();

//test code

console.log(specimenArray[11]);

console.log(specimenArray[17]);

specimenArray[11].compareDna(specimenArray[17]);

console.log(specimenArray[11].willItSurvive());

console.log(specimenArray[17].willItSurvive());

specimenArray[11].mutate();