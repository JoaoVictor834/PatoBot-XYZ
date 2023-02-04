// Exports the base of every event class

import { Client } from "discord.js"
import { Bot } from "mineflayer"

interface options {
    name: string
}

export = {
    dEvent: class {

        name: string
        client: Client

    constructor(client: Client, options: options) {
        this.client = client
        this.name = options.name
    }
},

mEvent: class {

    bot: Bot
    client: Client
    ebot: any
    name: string
    
    constructor(bot: Bot, client: Client, ebot: any, options: options) {
        this.bot = bot
        this.client = client
        this.ebot = ebot
        this.name = options.name
    }
}

}
