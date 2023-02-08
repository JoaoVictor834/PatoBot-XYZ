const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'seed',
            description: 'Saiba a seed do servidor',
        })
    }
    run = () => {

        this.bot.chat(`Seed do servidor: 4030416628395652580.`)

    }
}