export default {
  command: ["kick", "add", "promote", "demote", "group", "tagall"],
  description: "Group management commands",
  category: "group",
  group: true,
  admin: true,

  async execute(msg) {
    const { command, args, groupMetadata, isBotAdmin } = msg

    if (!isBotAdmin) {
      return msg.reply("❌ Bot needs to be admin to use this command!")
    }

    switch (command) {
      case "kick":
        if (!args[0]) return msg.reply("Usage: .kick @user")
        const kickTarget = args[0].replace("@", "") + "@s.whatsapp.net"
        await global.sock.groupParticipantsUpdate(msg.chat, [kickTarget], "remove")
        await msg.reply("✅ User kicked successfully")
        break

      case "add":
        if (!args[0]) return msg.reply("Usage: .add 1234567890")
        const addTarget = args[0] + "@s.whatsapp.net"
        await global.sock.groupParticipantsUpdate(msg.chat, [addTarget], "add")
        await msg.reply("✅ User added successfully")
        break

      case "promote":
        if (!args[0]) return msg.reply("Usage: .promote @user")
        const promoteTarget = args[0].replace("@", "") + "@s.whatsapp.net"
        await global.sock.groupParticipantsUpdate(msg.chat, [promoteTarget], "promote")
        await msg.reply("✅ User promoted to admin")
        break

      case "demote":
        if (!args[0]) return msg.reply("Usage: .demote @user")
        const demoteTarget = args[0].replace("@", "") + "@s.whatsapp.net"
        await global.sock.groupParticipantsUpdate(msg.chat, [demoteTarget], "demote")
        await msg.reply("✅ User demoted from admin")
        break

      case "group":
        if (!args[0]) return msg.reply("Usage: .group open/close")
        const action = args[0].toLowerCase()
        if (action === "close") {
          await global.sock.groupSettingUpdate(msg.chat, "announcement")
          await msg.reply("✅ Group closed - Only admins can send messages")
        } else if (action === "open") {
          await global.sock.groupSettingUpdate(msg.chat, "not_announcement")
          await msg.reply("✅ Group opened - All members can send messages")
        }
        break

      case "tagall":
        const participants = groupMetadata.participants.map((p) => p.id)
        const mentions = participants.map((p) => `@${p.split("@")[0]}`).join(" ")
        await global.sock.sendMessage(msg.chat, {
          text: `📢 *Group Mention*\n\n${mentions}`,
          mentions: participants,
        })
        break
    }
  },
}
