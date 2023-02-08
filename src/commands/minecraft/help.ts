import Command from '../../structures/Command'
import { PREFIX } from '../../../config.json'
import { PathLike, readdirSync } from 'fs'
import { join } from 'path'
import { Bot } from 'mineflayer'
import Client = require('../../../index')

export = class extends Command['mCommand'] {
    constructor(bot: Bot, client: typeof Client, ebot: typeof Client['ebot']) {
        super(bot, client, ebot, {
            name: 'help',
            description: 'Comando de ajuda',
            aliases: ['ajuda', 'rcomo usa o patobot']
        })
    }
    run = async (user: string): Promise<void> => {

        interface Commandlist {
            commands: string[]
            detailedcommands: string[]
        }

        const commandlist: Commandlist = {
            commands: [],
            detailedcommands: []
        }

      async function getCommands(path: PathLike, client: typeof Client, bot: Bot, ebot: typeof Client['ebot']): Promise<void> {

            const commands = readdirSync(path)

                for (const command of commands) {
                    const commandClass = await require(join(process.cwd(), `${path}/${command}`))
                    const cmd = await new (commandClass)(client, bot, ebot)

        
                    if(!cmd.name.startsWith('r')) {
                        commandlist.commands.push(`${PREFIX}${cmd.name}`)
                        commandlist.detailedcommands.push(`${cmd.name}: ${cmd.description}`)
                    }
                }
            
            }

           await getCommands('src/commands/minecraft', this.client, this.bot, this.ebot)

      
          
     this.bot.chat(`Oi! eu sou o bot mais chad do mundo. Comandos disponíveis: ${commandlist.detailedcommands.join('\n')}`)
        console.log(commandlist)


    }
}
