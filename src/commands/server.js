const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Current Discord server ki information deta hai."),

  async execute(interaction) {
    const guild = interaction.guild;

    await interaction.reply(
      `📊 **${guild.name}**\n\n` +
      `👥 Members: **${guild.memberCount}**\n` +
      `🆔 Server ID: **${guild.id}**\n` +
      `📅 Created: <t:${Math.floor(guild.createdTimestamp / 1000)}:D>`
    );
  }
};
