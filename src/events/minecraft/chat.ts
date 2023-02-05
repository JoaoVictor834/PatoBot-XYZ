import { Bot } from "mineflayer"
import Event from '../../structures/Event'
import Antispam from '../../antispam'
import { PREFIX } from '../../../config.json'
const filterlist = require('../../../filter.json').frases
import Client from '../../../index'

export = class extends Event['mEvent'] {
    constructor(bot: Bot, client: typeof Client, ebot: any) {
        super(bot, client, ebot, {
            name: 'chat'
        })


    }
    

    run = async (username: string, message: any) => {
        const usrmsg = `${username} ${message}`
        const db = this.ebot.db

// Verifys
        if (username === this.ebot.client.bot.username) this.ebot.client.cmd.send(`> ${message}`)

        function banFrases(m: string, ebot: { filter: { clean: (arg0: any) => any } }): string {
        if(filterlist.find((banfrase: string | RegExp) => {
            return new RegExp(banfrase, 'i').test(m)
        })) {
            return 'bobba bobba (EU AMO PINTO)'
        } else {
            return ebot.filter.clean(m)
        }
    }



            

         // Verify if is a command
                    const args = message.slice(PREFIX.length).trim().split(/ +/g);
                    const command = args.shift().toLowerCase();

        const cmd = message.startsWith(PREFIX) ?

            this.ebot.commands.find((c: { name: any }) => c.name === command) ||

            this.ebot.commands.find((c: { aliases: any[] | undefined }) => {
                if (c.aliases === undefined) return false
                return c.aliases.find((a: any) => a === command)
            }) :

            this.ebot.commands.find((c: { aliases: any[] | undefined }) => {
                if (c.aliases === undefined) return false
                return c.aliases.find((a: string) => {
                    if (!a.startsWith('r')) return false
                    return new RegExp(a.slice(1), 'i').test(message)
                })

            }) ||
            this.ebot.commands.find((c: { name: string }) => {
                if (!c.name.startsWith('r')) return false
                return new RegExp(c.name.slice(1), 'i').test(message)
            })

        if (cmd) return cmd.run(username, message, args)


        
        // Intialize chat function
        Antispam.chat(usrmsg, db, username, this.ebot.client, this.ebot, message, banFrases)



    }
}
