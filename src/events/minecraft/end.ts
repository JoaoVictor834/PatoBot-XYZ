import Event from '../../structures/Event'
import Bot from '../../structures/Bot'
import mineflayer from 'mineflayer'
import { NAME, VERSION, IP } from '../../../config.json'
import Client from '../../../index'

export = class extends Event['mEvent'] {
    constructor(bot: mineflayer.Bot, client: typeof Client, _: any) {
        super(bot, client, _, {
            name: 'end'
        })
    }
    
    run = async (reason: string) => {
        console.log('Reconectando ' + reason)

         function relog(client: any) {

console.log('Reconnecting...')
client.chat.send('Reconectando <a:load:1044704168159498340>')

          const CreatedBot = new Bot(mineflayer.createBot({
                username: NAME,
                version: VERSION,
                host: IP
            }), client)

          client.bot = CreatedBot
        }


        setTimeout(() => {
            relog(this.client)
        }, 31000)
}
}