export default {
  command: ["menu", "help"],
  alias: ["m", "h"],
  description: "Show bot menu",
  category: "main",

  async execute(msg) {
    const { plugins } = await import("../lib/plugins.js")

    const categories = {}
    plugins.forEach((plugin) => {
      const category = plugin.category || "misc"
      if (!categories[category]) categories[category] = []
      categories[category].push(plugin)
    })

    let menu = `╭─────────────────╮
│    🤖 PLAYBOY-MD    │
╰─────────────────╯

👨‍💻 *Author:* Trendex
📱 *Bot Name:* ${global.botname}
🔖 *Prefix:* ${global.prefix}
⏰ *Runtime:* ${process.uptime().toFixed(2)}s

`

    Object.keys(categories).forEach((category) => {
      menu += `╭─「 *${category.toUpperCase()}* 」\n`
      categories[category].forEach((plugin) => {
        menu += `│ ${global.prefix}${plugin.command[0]} - ${plugin.description}\n`
      })
      menu += `╰────────────────\n\n`
    })

    menu += `💡 *Tip:* Use ${global.prefix}help <command> for detailed info
🔗 *GitHub:* github.com/trendex/playboy-md

_© PLAYBOY-MD by Trendex_`

    await msg.reply(menu)
  },
}
