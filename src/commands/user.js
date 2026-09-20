const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("User ki information deta hai.")
    .addUserOption(option =>
      option
        .setName("member")
        .setDescription("Jis user ki information chahiye")
        .setRequired(false)
    ),

  async execute(interaction) {
    const user =
      interaction.options.getUser("member") ||
      interaction.user;

    await interaction.reply(
      `👤 **${user.username}**\n\n` +
      `🆔 ID: **${user.id}**\n` +
      `🤖 Bot: **${user.bot ? "Yes" : "No"}**\n` +
      `📅 Created: <t:${Math.floor(user.createdTimestamp / 1000)}:D>`
    );
  }
};
