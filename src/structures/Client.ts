import { Channel, Client } from 'discord.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import Bot from './Bot'
import { createBot } from 'mineflayer'
import { NAME, IP, VERSION, CHATBOT, CMDBOT, GUILD_ID, LOGIN } from '../../config.json'

//Export a class of client
export = class extends Client {
    chat: any
    cmd: any
    commands: Array<any>
    bot: any
    ebot: any
    constructor(options: any) {
        super(options)
        this.chat
        this.cmd
        this.commands = []
        this.loadEvents()
        this.loadCommands()
        this.botCreate()

    }

    // Create the bot
    botCreate(): void {
        const options = {
            AutoAuth: LOGIN,
            username: NAME,
            version: VERSION,
            host: IP
        }

        const CreatedBot = new Bot(createBot(options), this)
        this.ebot = CreatedBot
        this.bot = CreatedBot.bot

    }

    // Update/set chat
    updateChat(type: string): Channel | undefined {
        if (type === 'chatbot') {
            return this.channels.cache.get(CHATBOT)
        } else if (type === 'chatcmd') {
            return this.channels.cache.get(CMDBOT)
        }
    }

    // Register commands (temporary)
    async registryCommands(): Promise<void> {
        console.log('Carregando comandos de barra (/)')


       // await this.guilds.cache.get(GUILD_ID).commands.set([])

       // await this.application.commands.set(this.commands)
       //     .catch((error: Error) => console.log(error))

        console.log('Comandos de barra (/) carregados com sucesso!')
    }


    // Load commands
    loadCommands(path = 'src/commands/discord'): void {

        // Get path of commands
        const commands = readdirSync(path)

        // Get a event of every command
        for (const command of commands) {
            const commandClass = require(join(process.cwd(), `${path}/${command}`))
            const cmd = new (commandClass)(this)

            // Load the command
            this.commands.push(cmd)
            console.log(`Comando discord-${cmd.name} carregado!`)
        }

    }

    // Load events
    loadEvents(path: string = 'src/events/discord'): void {

        // Get path of events
        const events = readdirSync(path)

        // Get a event of every event
        for (const event of events) {
            const eventClass = require(join(process.cwd(), `${path}/${event}`))
            const evt = new (eventClass)(this)

            // Load the event
            this.on(evt.name, evt.run)
            console.log(`Evento discord-${evt.name} carregado!`)

        }

    }
}
