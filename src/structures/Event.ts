// Exports the base of every event class
import { Bot } from "mineflayer"
import Client from "../../index"

interface options {
    name: string
}

export = {
    dEvent: class {

        name: string
        client: typeof Client

    constructor(client: typeof Client, options: options) {
        this.client = client
        this.name = options.name
    }
},

mEvent: class {

    bot: Bot
    client: typeof Client
    ebot: typeof Client.ebot
    name: string
    
    constructor(bot: Bot, client: typeof Client, ebot: typeof Client.ebot, options: options) {
        this.bot = bot
        this.client = client
        this.ebot = ebot
        this.name = options.name
    }
}

}
