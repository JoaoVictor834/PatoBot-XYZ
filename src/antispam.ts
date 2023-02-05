const { HOOK } = require('../config')
const names = require('../pfp/names').names
import { Colors, EmbedBuilder } from 'discord.js'
import { Collection } from 'simpl.db'
import 'isomorphic-fetch'

export = {
    chat: async function (usrmsg: string, db: Collection<any>, username: string, client: any, ebot: any, message: string, banfrase: Function): Promise<void> {

        let vezes = ebot.quantity
        let val = ebot.getValue("chat")
        let dcmsgs = ebot.dcmsgs

       // if(message.startsWith('(!)')) return
        
        if(new RegExp('https://').test(message)) return
        if(new RegExp('\\[Você').test(message)) return
        if(new RegExp('Você\\]').test(message)) return
        if(new RegExp('http://').test(message)) return
        
        async function getUUID(path = `https://api.mojang.com/users/profiles/minecraft/${username}`): Promise<any> {
            const response = await fetch(path)
            if (response.status !== 200) return
            const data: any = await response.json()

            if (!data.id) return

            return await data.id

        }

        async function RandomAvatar(): Promise<string | undefined> {

            if (db.has(a => a.name === username)) {
                let user = await db.get(a => a.name === username).avatar

                const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${user}`)
                if (response.status !== 200) return
                const data: any = await response.json()

                if (!data.id) return

                return `https://crafatar.com/avatars/${await data.id}?size=32&overlay`

            }
        }

        async function getAvatar(): Promise<string | undefined> {
            if (username === 'Anarkcraft' || username === 'Broadcast') return 'https://cdn.discordapp.com/avatars/877796682560061460/c01f752b93b9cbd607819f878df90dd1.jpg'


            if (!db.has(a => a.name === username)) return

            let user = db.get(a => a.name === username)

            if (!user.useCustomSkin) return

            const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${user}`)
            if (response.status !== 200) return
            const data: any = await response.json()

            if (!data.id) return

            return `https://crafatar.com/avatars/${await data.id}?size=32&overlay`

        }





        if (dcmsgs.some((usm: { usrmsg: string }) => usm.usrmsg === usrmsg)) {

            let DelId = dcmsgs.find((usm: { usrmsg: string }) => usm.usrmsg === usrmsg).ID

            client.chat.messages.fetch(DelId).then(async (msg: { delete: () => any }) => {
                await msg.delete()

                dcmsgs.splice(dcmsgs.findIndex((usm: { usrmsg: string }) => usm.usrmsg.startsWith(usrmsg)), 1)

            }).catch((e: any) => console.log(e))


            ebot.val = dcmsgs.find((usm: { usrmsg: string }) => usm.usrmsg === usrmsg).val

            val = ebot.getValue("chat")

            let x = 0



            vezes.forEach((vez: { id: any; qty: number }) => {
                if (vez.id === val) {
                    vez.qty = vez.qty + 1
                    x = vez.qty
                }
            })


            getUUID().then(uuid => {
                client.fetchWebhook(HOOK.ID, HOOK.TOKEN)
                    .then(async (hk: { send: (arg0: { content: string; username: string; avatarURL: string | boolean | undefined }) => Promise<any> }) => {

                        hk.send(
                            {
                                content: `${banfrase(message, ebot)}(x${x})` || `\`Mensagem inválida (x${x})\``,
                                username: username || 'Nome invalido',
                                avatarURL: await getAvatar() ? await getAvatar() : uuid ? `https://crafatar.com/avatars/${uuid}?size=32&overlay` : await RandomAvatar()

                            }).then((msg: { id: any }) => {



                                dcmsgs.push({
                                    "ID": msg.id,
                                    "usrmsg": usrmsg,
                                    "val": val
                                })

                                if (dcmsgs.lenght >= 10) dcmsgs = []




                            }).catch((e: any) => {
                                console.log(e)

                            })
                    })

            })



        } else {

            ebot.val = Math.round(Math.random() * 1000000000000)
            val = ebot.getValue("chat")
            vezes.push({
                "id": val,
                "qty": 1
            })

            getUUID().then(uuid => {
                client.fetchWebhook(HOOK.ID, HOOK.TOKEN)
                    .then(async (hk: { send: (arg0: { content: string; username: string; avatarURL: string | boolean | undefined }) => Promise<any> }) => {

                        hk.send(
                            {
                                content: `${banfrase(message, ebot)}` || `\`Mensagem inválida\``,
                                username: username || 'Nome invalido',
                                avatarURL: await getAvatar() ? await getAvatar() : uuid ? `https://crafatar.com/avatars/${uuid}?size=32&overlay` : await RandomAvatar()

                            }).then((msg: { id: any }) => {



                                dcmsgs.push({
                                    "ID": msg.id,
                                    "usrmsg": usrmsg,
                                    "val": val

                                })

                                if (dcmsgs.lenght >= 10) dcmsgs = []





                            }).catch((e: Error): void => {
                                console.log(e)

                            })
                    })

            })

        }



    },

    death: async function (reason: string, username: any, ebot: { quantityD: Array<any>; getValue: (arg0: string) => number; dcmsgsD: Array<any>; vald: number; filter: { clean: (arg0: any) => any } }, client: { chat: { messages: { fetch: (arg0: any) => Promise<any> }; send: (arg0: { embeds: EmbedBuilder[] }) => Promise<any> } }): Promise<void> {
        const usrreason = `${username} ${reason}`

        let vezes = ebot.quantityD
        let dval = ebot.getValue("kill")
        let deathmsgs = ebot.dcmsgsD



        if (deathmsgs.some((usm: { usrreason: string }): boolean => usm.usrreason === usrreason)) {

            let DelId = deathmsgs.find((usm: { usrreason: string }) => usm.usrreason === usrreason).ID

            client.chat.messages.fetch(DelId).then(async (msg: { delete: () => any }) => {
                await msg.delete()

                deathmsgs.splice(deathmsgs.findIndex((usm: { usrreason: string }) => usm.usrreason.startsWith(usrreason)), 1)

            }).catch((e: Error): void => console.log(e))




            ebot.vald = deathmsgs.find((usm: { usrreason: string }) => usm.usrreason === usrreason).dval

            dval = ebot.getValue("kill")

            let x = 0

            vezes.forEach((vez: { id: any; qty: number }) => {
                if (vez.id === dval) {
                    vez.qty = vez.qty + 1
                    x = vez.qty
                }
            })




            const DeathEmbedX = new EmbedBuilder()
                .setDescription(`*${username}* ${ebot.filter.clean(reason.trim())}(x${x})!`)
                .setColor(Colors.DarkGold)

            client.chat.send({ embeds: [DeathEmbedX] }).then((msg: { id: any }) => {


                deathmsgs.push({
                    "ID": msg.id,
                    "usrreason": usrreason,
                    "dval": dval
                })

                if (deathmsgs.length >= 10) deathmsgs = []




            }).catch((e: any) => {
                console.log(e)
            })




        } else {


            ebot.vald = Math.round(Math.random() * 100000000000)
            dval = ebot.getValue("kill")

            vezes.push({
                "id": dval,
                "qty": 1
            })



            const DeathEmbed = new EmbedBuilder()
                .setDescription(`*${username}* ${ebot.filter.clean(reason.trim())}!`)
                .setColor(Colors.DarkGold)

            client.chat.send({ embeds: [DeathEmbed] }).then((msg: { id: any }) => {



                deathmsgs.push({
                    "ID": msg.id,
                    "usrreason": usrreason,
                    "dval": dval

                })

                if (deathmsgs.length >= 10) deathmsgs = []



            }).catch((e: Error): void => {
                console.log(e)

            })


        }


    }

}
