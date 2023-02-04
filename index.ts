//Imports
import { GatewayIntentBits } from 'discord-api-types/gateway/v10'
import Client from './src/structures/Client'

const { BOT_TOKEN } = require('./config')

// Create the client
const client = new Client({
    intents: [                  
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]

})


// Login in the discord bot
client.login(BOT_TOKEN)

export = client
