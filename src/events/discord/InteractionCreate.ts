import { ApplicationCommand, InteractionType } from 'discord.js'
import Event from '../../structures/Event'
import Client from '../../../index'

module.exports = class extends Event['dEvent'] {
    constructor(client: typeof Client) {
        super(client, {
            name: 'interactionCreate'
        })
    }
    run = async (interaction: { type: InteractionType; commandName: ApplicationCommand['name']; client: { bot: typeof Client.ebot ; ebot: typeof Client } }) => {

        if (interaction.type === InteractionType.ApplicationCommand) {
            const cmd = this.client.commands.find(c => c.name === interaction.commandName)
            if (cmd) cmd.run(interaction.client.bot, interaction)
        } else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
            const cmd = this.client.commands.find(c => c.name === interaction.commandName)
            if (!cmd) return
            try {
                await cmd.autocomplete(interaction, interaction.client.ebot)
            } catch (error) {
                console.error(error)
            }

        }
    }
}
