import { Bot } from 'mineflayer'
import Event from '../../structures/Event'
import Client from '../../../index'
import { LOGIN } from '../../../config.json'


export = class extends Event['mEvent'] {
    constructor(bot: Bot, client: typeof Client, ebot: any) {
        super(bot, client, ebot, {
            name: 'message'
        })
    } 
    
    run = (message: { toString: () => string; hasOwnProperty: (arg0: string) => boolean; extra: { color: string }[] }) => {
       
      const msg = message.toString()
      
// Remake for anarquia.xyz only open of server

        if(msg === '') return
        if(msg === ' ') return
      console.log('[CHAT] ' + msg)

        let regAuth = /Use the command (\/login)|Use the command (\/register)/

        if(regAuth.test(msg)) {
          let result = msg.match(regAuth)
          if(!result) return
        
          this.bot.chat(`${result[1]} ${LOGIN}`)

        }
      
        if(message.hasOwnProperty('extra')) {

          if (message.extra[0].color === "red") {
            if(this.client.cmd) {
         return this.client.cmd.send(`> ${msg}`)
            }
          }
        }




    }
}