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
  let m = array.length, t, i;

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
    const entrantsArr = response.entrantQty.split(", ")
    const roundQty = parseInt(response.roundQty)
    // TODO: assign entrants to response.roundQty rounds of combat using random assignment

    // calculate matches per round
    const matchesPerRound = Math.ceil(entrantQty / matchCapQty);
    // console.log("This is the number of combatants:", entrantQty);
    // console.log("This is the number of matches per round:", matchesPerRound);
    // console.log("This is the number of rounds:", roundQty);
    // console.log("Here's a list of combatants:", entrantsArr);

    // for each round, assign combatants in entrantsArr to matches totaling the number of matchesPerRound

    shuffle(entrantsArr)

    for (let i = 0; i < roundQty; i++) {
      // shuffle order of entrants in array per round for assignment to matches
      shuffle(entrantsArr);

      // divide entrantsArr into new arrays whose length is capped at matchCapQty

      // post these arrays as individual matches, with the total number of matches equalling roundQty * matchesPerRound

      console.log("This is the order for match", i+1, ":", entrantsArr)
      
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
                                                                                        
                             "It's tourney time."

          App designed by Ryan R. Campbell (rrcampbell-exe on GitHub)
`);

init();
