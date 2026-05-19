/**
 * BUNNY ALPHA - ALL COMMANDS LIST MENU
 * 100% English Codebase | Dynamic File-System Introspection
 * Simple All-In-One Main Menu Layout | Unique Symbolic Transitions
 */

const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'allmenu',
    category: 'utility',
    description: 'Display all available bot commands sorted by their categories.',
    execute: async ({ sock, rawMsg, fromJid, bName, liveConfig, reply }) => {
        try {
            const commandsDirectory = path.join(__dirname, '../commands');
            
            // 1. Read files and organize into categories automatically
            const commandFiles = fs.readdirSync(commandsDirectory).filter(file => file.endsWith('.js'));
            const dynamicRegistry = new Map();

            for (const file of commandFiles) {
                try {
                    const commandModule = require(path.join(commandsDirectory, file));
                    if (commandModule && commandModule.name && commandModule.category) {
                        if (!dynamicRegistry.has(commandModule.category)) {
                            dynamicRegistry.set(commandModule.category, []);
                        }
                        dynamicRegistry.get(commandModule.category).push(commandModule);
                    }
                } catch (loadError) {
                    continue;
                }
            }

            const organizedCategories = Array.from(dynamicRegistry.keys()).sort();

            // Unique Sparkle Crystal Reaction Symbol for opening the full list (Never reused)
            await sock.sendMessage(fromJid, { 
                react: { text: "🔮", key: rawMsg.key } 
            });

            // 2. Build simple and clean main menu text dashboard with rounded corners
            let masterDashboardLayout = 
`╭─⌈ 🐇 *${bName.toUpperCase()} ALL MENU* ⌋
│ 📄 Status: All Features Loaded
├──────────────────────────\n`;

            // Display each category name and its commands clearly
            organizedCategories.forEach((categoryName) => {
                const targetedCommandsList = dynamicRegistry.get(categoryName);
                
                masterDashboardLayout += `│ 💠 *${categoryName.toUpperCase()} COMMANDS*\n`;
                
                targetedCommandsList.forEach((cmd) => {
                    masterDashboardLayout += `│  ⤷ \`${liveConfig.prefix}${cmd.name}\`\n`;
                });
                
                masterDashboardLayout += `│\n`;
            });

            masterDashboardLayout += `╰⊷ *Total Active Commands: ${commandFiles.length}*`;

            return await sock.sendMessage(fromJid, { text: masterDashboardLayout }, { quoted: rawMsg });

        } catch (allMenuGenerationFault) {
            console.error("🛑 Error detected inside allmenu engine:", allMenuGenerationFault);
            
            // Unique Fire Spark Reaction Symbol for errors (Never reused)
            await sock.sendMessage(fromJid, { 
                react: { text: "💥", key: rawMsg.key } 
            });
            return await reply("Error: Failed to load the complete commands list menu.");
        }
    }
};
