require("dotenv").config();

const {
  REST,
  Routes
} = require("discord.js");

const ping = require("./commands/ping");
const server = require("./commands/server");
const user = require("./commands/user");

const commands = [
  ping.data.toJSON(),
  server.data.toJSON(),
  user.data.toJSON()
];

const rest = new REST({ version: "10" })
  .setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Deploying Nexora slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands
      }
    );

    console.log("✅ Slash commands deployed.");
  } catch (error) {
    console.error(error);
  }
})();
