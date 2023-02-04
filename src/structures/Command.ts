// Exports the base of every command class

import { Client, CommandInteractionOption } from "discord.js"
import { Bot } from "mineflayer"


interface mOptios {
    description: string
    name: string
    aliases: Array<string>
}

interface dOptions extends CommandInteractionOption  {
    description: string
}

export = {
    dCommand: class {

        client: Client
        name: string
        description: string
        options: any

    constructor(client: Client, options: dOptions) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
    }
},
 mCommand: class {

    client: Client
    name: string
    ebot: any
    bot: Bot
    aliases: Array<string>
    options: any

    constructor(bot: Bot, client: Client, ebot: any, options: mOptios) {
        this.client = client
        this.ebot = ebot
        this.bot = bot
        this.name = options.name
        this.aliases = options.aliases 
    }
 }

}
