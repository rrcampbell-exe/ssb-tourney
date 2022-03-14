const inquirer = require('inquirer')

const tourneyQuestions = [
  {
    type: 'input',
    name: 'entrants',
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
    name: 'rounds',
    message: 'How many rounds will be featured in the tournament\'s first stage?',
    validate: roundInput => {
      // regex to test for a number
      if (/^\d+$/.test(roundInput)) {
        return true
      }
      console.log(`
      
      Please enter a whole number for the number of rounds.
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