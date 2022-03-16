const inquirer = require("inquirer");

const tourneyObj = {};

const tourneyQuestions = [
  {
    type: "input",
    name: "entrantQty",
    message:
      "Please enter the names of this tournament's competitors, separated by commas.",
    validate: (entrantInput) => {
      if (entrantInput.split(",").length >= 2) {
        return true;
      }
      console.log(`

      You must enter the name of at least two competitors.
      `);
    },
  },
  {
    type: "input",
    name: "roundQty",
    message:
      "How many rounds will be featured in the tournament's first stage?",
    validate: (roundInput) => {
      if (/^\d+$/.test(roundInput)) {
        return true;
      }
      console.log(`
      
      Please enter a whole number for the number of rounds.
      `);
    },
  },
  {
    type: "input",
    name: "matchCapQty",
    message: "What's the maximum number of combatants per match?",
    validate: (matchCapInput) => {
      // TODO: expose value of entrantList outside of initial scope to verify entrantList.length is greater than or equal to the matchCapLength
      if (/^\d+$/.test(matchCapInput)) {
        return true;
      }
      console.log(`
      
      Please make sure you've provided a whole number that is less than or equal to the number of tournament entrants.
      `);
    },
  },
];

// Fisher-Yates (aka Knuth) Shuffle-ish, source: https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

const init = () => {
  return inquirer.prompt(tourneyQuestions).then((response) => {
    const entrantQty = response.entrantQty.split(",").length;
    const matchCapQty = parseInt(response.matchCapQty);
    let entrantsArr = response.entrantQty.split(", ");
    const roundQty = parseInt(response.roundQty);

    // calculate matches per round
    const matchesPerRound = Math.ceil(entrantQty / matchCapQty);

    shuffle(entrantsArr);

    for (let i = 0; i < roundQty; i++) {
      // shuffle order of entrants in array per round for assignment to matches
      if (entrantsArr.length === 0) {
        entrantsArr.push(response.entrantQty.split(", "));
        shuffle(entrantsArr)
      }

      let tournamentMatches = [];
      for (let j = 0; j < matchesPerRound; j++) {
        let combatantsInMatch = [];
        let entrantsPerRound = entrantsArr;
        for (let k = 0; k < matchCapQty; k++) {
          combatantsInMatch.push(entrantsPerRound[k]);
        }
        entrantsPerRound.splice(0, matchCapQty);
        tournamentMatches.push(combatantsInMatch);
      }
      console.log("The matches in round", i + 1, "are", tournamentMatches, ".");
    }
  });
};

console.log(`

███████╗██╗   ██╗██████╗ ███████╗██████╗     ███████╗███╗   ███╗ █████╗ ███████╗██╗  ██╗
██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗    ██╔════╝████╗ ████║██╔══██╗██╔════╝██║  ██║
███████╗██║   ██║██████╔╝█████╗  ██████╔╝    ███████╗██╔████╔██║███████║███████╗███████║
╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗    ╚════██║██║╚██╔╝██║██╔══██║╚════██║██╔══██║
███████║╚██████╔╝██║     ███████╗██║  ██║    ███████║██║ ╚═╝ ██║██║  ██║███████║██║  ██║
╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝    ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                                                                        
        ██████╗ ██████╗  ██████╗ ████████╗██╗  ██╗███████╗██████╗ ███████╗              
        ██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔════╝              
        ██████╔╝██████╔╝██║   ██║   ██║   ███████║█████╗  ██████╔╝███████╗              
        ██╔══██╗██╔══██╗██║   ██║   ██║   ██╔══██║██╔══╝  ██╔══██╗╚════██║              
        ██████╔╝██║  ██║╚██████╔╝   ██║   ██║  ██║███████╗██║  ██║███████║              
        ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝              
                                                                                        
                             "Let's smash."

          App designed by Ryan R. Campbell (rrcampbell-exe on GitHub)
`);

init();
