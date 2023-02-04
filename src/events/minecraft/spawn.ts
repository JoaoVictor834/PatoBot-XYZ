import { Bot } from 'mineflayer'
import Event from '../../structures/Event'
const wait = require('node:timers/promises').setTimeout
const { LOGIN } = require('../../../config.json')

module.exports = class extends Event['mEvent'] {
    constructor(bot: Bot, client: any, ebot: any) {
        super(bot, client, ebot, {
            name: 'spawn'
        })
    }

    run = async () => {

        await wait(1000)
        this.bot.chat('/queue anarkcraft')
        this.bot.chat('/login ' + LOGIN)

        await this.bot.tabComplete('/').then(complete => {
            this.ebot.choices = []
                
            complete.forEach(cmd => {

            
                 this.ebot.choices.push(
                     cmd.match
                 )
            })
            })

           

        this.ebot.client.cmd.send('> Spawnado')
            
        
       

    }
}
