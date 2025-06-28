import os from "os"
import { runtime, formatBytes } from "../lib/utils.js"

export default {
  command: ["ping", "speed", "runtime", "info", "owner"],
  description: "Bot information commands",
  category: "info",

  async execute(msg) {
    const { command } = msg

    switch (command) {
      case "ping":
        const start = Date.now()
        const message = await msg.reply("🏓 Pinging...")
        const end = Date.now()
        await global.sock.sendMessage(msg.chat, {
          text: `🏓 *Pong!*\n\n⚡ Speed: ${end - start}ms`,
          edit: message.key,
        })
        break

      case "speed":
        const used = process.memoryUsage()
        const cpus = os.cpus().map((cpu) => {
          cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
          return cpu
        })
        const cpu = cpus.reduce(
          (last, cpu, _, { length }) => {
            last.total += cpu.total
            last.speed += cpu.speed / length
            last.times.user += cpu.times.user
            last.times.nice += cpu.times.nice
            last.times.sys += cpu.times.sys
            last.times.idle += cpu.times.idle
            last.times.irq += cpu.times.irq
            return last
          },
          {
            speed: 0,
            total: 0,
            times: {
              user: 0,
              nice: 0,
              sys: 0,
              idle: 0,
              irq: 0,
            },
          },
        )

        const speedTest = `⚡ *PLAYBOY-MD Speed Test*

💾 *Memory Usage:*
${Object.keys(used)
  .map((key, _, arr) => `${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatBytes(used[key])}`)
  .join("\n")}

🖥️ *CPU Info:*
Model: ${cpus[0].model}
Speed: ${cpu.speed} MHz
Cores: ${cpus.length}

⏱️ *Runtime:* ${runtime(process.uptime())}
📊 *Platform:* ${os.platform()}
🏠 *Hostname:* ${os.hostname()}`

        await msg.reply(speedTest)
        break

      case "runtime":
        await msg.reply(`⏱️ *Bot Runtime*\n\n${runtime(process.uptime())}`)
        break

      case "info":
        const info = `🤖 *PLAYBOY-MD Bot Info*

📱 *Bot Name:* ${global.botname}
👨‍💻 *Author:* ${global.author}
🔖 *Version:* 1.0.0
🌐 *Platform:* WhatsApp
⚡ *Runtime:* ${runtime(process.uptime())}
📦 *Prefix:* ${global.prefix}

🔗 *GitHub:* github.com/trendex/playboy-md
💬 *Support:* wa.me/254763211803

_© PLAYBOY-MD by Trendex_`
        await msg.reply(info)
        break

      case "owner":
        await msg.reply(
          `👨‍💻 *Bot Owner*\n\n*Name:* Trendex\n*Number:* wa.me/254763211803\n*GitHub:* github.com/trendex`,
        )
        break
    }
  },
}
