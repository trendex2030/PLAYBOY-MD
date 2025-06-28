export default {
  command: ["joke", "quote", "fact", "meme"],
  description: "Fun commands",
  category: "fun",

  async execute(msg) {
    const { command } = msg

    switch (command) {
      case "joke":
        const jokes = [
          "Why don't scientists trust atoms? Because they make up everything!",
          "Why did the scarecrow win an award? He was outstanding in his field!",
          "Why don't eggs tell jokes? They'd crack each other up!",
          "What do you call a fake noodle? An impasta!",
          "Why did the math book look so sad? Because it had too many problems!",
        ]
        await msg.reply(`😂 *Random Joke*\n\n${jokes[Math.floor(Math.random() * jokes.length)]}`)
        break

      case "quote":
        const quotes = [
          "The only way to do great work is to love what you do. - Steve Jobs",
          "Innovation distinguishes between a leader and a follower. - Steve Jobs",
          "Life is what happens to you while you're busy making other plans. - John Lennon",
          "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
          "It is during our darkest moments that we must focus to see the light. - Aristotle",
        ]
        await msg.reply(`💭 *Inspirational Quote*\n\n${quotes[Math.floor(Math.random() * quotes.length)]}`)
        break

      case "fact":
        const facts = [
          "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
          "A group of flamingos is called a 'flamboyance'.",
          "Bananas are berries, but strawberries aren't.",
          "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
          "Octopuses have three hearts and blue blood.",
        ]
        await msg.reply(`🧠 *Random Fact*\n\n${facts[Math.floor(Math.random() * facts.length)]}`)
        break

      case "meme":
        await msg.reply("🎭 Meme generator coming soon!")
        break
    }
  },
}
