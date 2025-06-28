import { DATABASE } from "../lib/database.js"

export default {
  command: ["ban", "unban", "broadcast", "eval"],
  description: "Owner commands",
  category: "owner",
  owner: true,

  async execute(msg) {
    const { command, args, text } = msg

    switch (command) {
      case "ban":
        if (!args[0]) return msg.reply("Usage: .ban @user")
        const banTarget = args[0].replace("@", "") + "@s.whatsapp.net"
        DATABASE.banUser(banTarget)
        await msg.reply(`✅ User banned successfully`)
        break

      case "unban":
        if (!args[0]) return msg.reply("Usage: .unban @user")
        const unbanTarget = args[0].replace("@", "") + "@s.whatsapp.net"
        DATABASE.unbanUser(unbanTarget)
        await msg.reply(`✅ User unbanned successfully`)
        break

      case "broadcast":
        if (!text) return msg.reply("Usage: .broadcast <message>")
        const groups = Object.keys(DATABASE.data.groups)
        let sent = 0
        for (const group of groups) {
          try {
            await global.sock.sendMessage(group, { text: `📢 *BROADCAST*\n\n${text}` })
            sent++
          } catch (error) {
            console.error(`Failed to send to ${group}:`, error)
          }
        }
        await msg.reply(`✅ Broadcast sent to ${sent} groups`)
        break

      case "eval":
        if (!text) return msg.reply("Usage: .eval <code>")
        try {
          const result = eval(text)
          await msg.reply(`Result:\n${result}`)
        } catch (error) {
          await msg.reply(`Error:\n${error.message}`)
        }
        break
    }
  },
}
