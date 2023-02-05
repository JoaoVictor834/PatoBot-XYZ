import { Bot } from 'mineflayer'
import Event from '../../structures/Event'
const wait = require('node:timers/promises').setTimeout
import Client from '../../../index'


export = class extends Event['mEvent'] {
    constructor(bot: Bot, client: typeof Client, ebot: any) {
        super(bot, client, ebot, {
            name: 'spawn'
        })
    }

    run = async () => {

        await wait(1000)
        this.bot.chat('/queue anarkcraft')

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
