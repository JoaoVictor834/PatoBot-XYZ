import Event from '../../structures/Event';
import { CHATBOT, CMDBOT, HOOK } from '../../../config.json';
import { Message, PermissionsBitField } from 'discord.js';
import Client from '../../../index'

export = class extends Event['dEvent'] {
    constructor(client: typeof Client) {
        super(client, {
            name: 'messageCreate'
        })
    }
    
    run = async (message: Message): Promise<any> => {
      
        
        if(message.author.id === this.client.user?.id) return
        if(message.channel.id === CMDBOT) {
            return this.client.bot.chat(`${message}`)
        }

      if(message.channel.id !== CHATBOT) return
      if(message.webhookId === HOOK.ID) return
      if(message.content.length > 240) return
      if(/\n/.test(message.content)) return
      

      if(message.content.startsWith('&') && !message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('Se quiser usar cor compre apoiador boboca https://loja.anarkcraft.xyz')

       const db = async (client: typeof Client): Promise<any> => {

        if(!client.ebot) return

        if(!client.ebot.debounce) {
      
        client.ebot.debounce = true

       await client.ebot.debounceFunction(1000)

       return this.client.bot.chat(`${message.author.username}: ${message.content}`)
        } else {
            
             message.reply("Você esta enviando mensagens rapido demais!").then((msg: { delete: () => void; }) => {
                 setTimeout(() => {
                     msg.delete()
     
                 }, 5000)})
                 const MutedRole = message.guild?.roles.cache.find(
                    (role: { name: string; }) => role.name === "Muted"
                 )
                 if(!MutedRole) return console.log("[DEBUG] mutar falhou sem cargo")

      
                 message.member?.roles.add(MutedRole).then(() => {
                    setTimeout(() => {
                        message.member?.roles.remove(MutedRole)
                        console.log("[DEBUG] removido cargo de mutado")
                    }, 3000)
                 }).catch((err: any): void => {
                   console.error(err)
                 })
        }
            }

           await db(this.client)
      }
    }

