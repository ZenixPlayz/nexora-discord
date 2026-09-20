require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Collection
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.commands = new Collection();

const commandFiles = [
  "./commands/ping",
  "./commands/server",
  "./commands/user"
];

for (const file of commandFiles) {
  const command = require(file);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`Nexora online as ${client.user.tag}`);
  console.log(`Serving ${client.guilds.cache.size} server(s).`);

  client.user.setPresence({
    activities: [
      {
        name: "/help | Nexora",
        type: 0
      }
    ],
    status: "online"
  });
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "❌ Command execute karte waqt error aa gaya.",
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: "❌ Command execute karte waqt error aa gaya.",
        ephemeral: true
      });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
