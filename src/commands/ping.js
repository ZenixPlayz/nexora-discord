const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Nexora ka latency check karta hai."),

  async execute(interaction) {
    const latency = interaction.client.ws.ping;

    await interaction.reply(
      `🏓 Pong!\nDiscord WebSocket: **${latency}ms**`
    );
  }
};
