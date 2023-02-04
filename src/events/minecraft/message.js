const Event = require('../../structures/Event')


module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'message'
        })
    } 
    
    run = (message) => {
       
      const msg = message.toString()

      
// Remake for anarquia.xyz only open of server

        if(msg === '') return
        if(msg === ' ') return
      
        if(message.hasOwnProperty('extra')) {

          if (message.extra[0].color === "red") {
            if(this.client.cmd) {
         return this.client.cmd.send(`> ${msg}`)
            }
          }
        }




    }
}