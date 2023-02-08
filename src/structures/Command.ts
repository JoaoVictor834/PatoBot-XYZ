// Exports the base of every command class

import { BaseApplicationCommandOptionsData, CommandInteractionOption } from "discord.js"
import { Bot } from "mineflayer"
import Client from '../../index'


interface mOptios {
    description: string
    name: string
    aliases: Array<string>
}


export = {
    dCommand: class {

        client: typeof Client
        name: string
        description: string
        options: any

    constructor(client: typeof Client, options: any) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
    }
},
 mCommand: class {

    client: typeof Client
    name: string
    ebot: any
    bot: Bot
    aliases: Array<string>
    options: any
    description: string

    constructor(bot: Bot, client: typeof Client, ebot: typeof Client['ebot'], options: mOptios) {
        this.client = client
        this.ebot = ebot
        this.bot = bot
        this.name = options.name
        this.aliases = options.aliases 
        this.description = options.description
    }
 }

}
