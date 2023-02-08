import express from 'express'
import { PathLike, readdirSync } from 'fs'
import { Bot } from 'mineflayer'
import { PREFIX } from '../config.json'
import { join } from 'path'
import Client from '../index'
const app = express()

async function server(client: typeof Client, bot: Bot | any ) { 

    const commandlist: string[] = []

    function getCommands(path: PathLike, client: typeof Client, bot: Bot, ebot: typeof Client['ebot']): void {
         const commands = readdirSync(path)
 
             for (const command of commands) {
                 const commandClass = require(join(process.cwd(), `${path}/${command}`))
                 const cmd = new (commandClass)(client, bot, client.ebot)
 
                 if(!cmd.name.startsWith('r')) commandlist.push(`${PREFIX}${cmd.name}`)
             }
            }
         
 
         getCommands('src/commands/minecraft', client, bot, client.ebot)
 
    app.use('/getCommands', function(req, res)  {
        res.json(commandlist)
    })

    app.use('/getBotInfo', function(req, res)  {
        res.json({
            vida: bot.health,
            comida: bot.food,
            xp: bot.experience.level,
            ping: bot.players[bot.username].ping,
            mortes: bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Mortes: [0-9]*/) ? bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Mortes: [0-9]*/)[0] : '',
            cordenadas: bot.entity.position
        })
    })

    app.use('/getServerInfo', async function(req, res)  {
        res.json({
            players: Object.keys(bot.players).join(', '),
            tps: bot.getTps(),
        })
    })
    app.listen(80)
    console.log('Iniciado server!')
}


export = server