const Event = require('../../structures/Event')
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat:tell2'
        })
        
    } 
    
    run = (matches) => {

             
// Remake for anarquia.xyz only open of server 

        const msg = matches[0][1]
        const user = matches[0][0]
        
        this.client.chat.send(`**(Tell) Para -->** *${user}: ${msg.trim()}*`)

    }
}
