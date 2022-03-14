const inquirer = require('inquirer')

const tourneyQuestions = [
  {
    type: 'input',
    name: 'entrantQty',
    message: 'Please enter the names of this tournament\'s competitors, separated by commas.',
    validate: entrantInput => {
      const entrantList = entrantInput.split(',')
      if (entrantList.length >=2) {
        return true;
      }
      console.log(`

      You must enter the name of at least two competitors.
      `)
    }
  },
  {
    type: 'input',
    name: 'roundQty',
    message: 'How many rounds will be featured in the tournament\'s first stage?',
    validate: roundInput => {
      if (/^\d+$/.test(roundInput)) {
        return true
      }
      console.log(`
      
      Please enter a whole number for the number of rounds.
      `)
    }
  },
  {
    type: 'input',
    name: 'matchCapQty',
    message: 'What\'s the maximum number of combatants per match?',
    validate: matchCapInput => {
      // TODO: expose value of entrantList outside of initial scope
      if (/^\d+$/.test(matchCapInput) && matchCapInput <= entrantList.length) {
        return true
      }
      console.log(`
      
      Please make sure you've provided a whole number that is less than or equal to the number of tournament entrants.
      `)
    }
  }
]

const init = function() {
  return inquirer
  .prompt(tourneyQuestions)
  .then(response => {
    console.log(response)
  })
}

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
`)


init();