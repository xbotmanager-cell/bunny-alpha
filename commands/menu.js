/**
 * BUNNY ALPHA - SYSTEM DYNAMIC INTERACTIVE MENU DISTRIBUTOR
 * 100% English Codebase | Dynamic File-System Introspection
 * Two-Way Number-Based Reply Routing Matrix | Rounded Wireframe Design
 */

const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'menu',
    category: 'utility',
    description: 'Access the main system dashboard categories and inspect individual execution layers.',
    execute: async ({ sock, rawMsg, fromJid, args, bName, liveConfig, reply }) => {
        try {
            const commandsDirectory = path.join(__dirname, '../commands');
            
            // 1. Dynamic Introspection Phase: Read and map all local command modules instantly
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
                    // Fail-safe skip for malformed modules during active directory mapping
                    continue;
                }
            }

            // Extract sorted distinctive categories array from the mapped matrix keys
            const organizedCategories = Array.from(dynamicRegistry.keys()).sort();

            // 2. Interception Phase: Verify if the user is processing a Sub-Category Request (Via arguments or Quoted Reply)
            let selectedTargetIndex = null;

            // Pathway A: Direct execution parameter verification (e.g., .menu 1)
            if (args[0] && !isNaN(args[0])) {
                selectedTargetIndex = parseInt(args[0]) - 1;
            } 
            // Pathway B: Active context verification via quoted message reply verification
            else if (rawMsg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
                const quotedBodyText = rawMsg.message.extendedTextMessage.text || "";
                if (!isNaN(quotedBodyText.trim())) {
                    selectedTargetIndex = parseInt(quotedBodyText.trim()) - 1;
                }
            }

            // 3. Execution Phase B: Route to Sub-Category Panel if a valid number index is matched
            if (selectedTargetIndex !== null && selectedTargetIndex >= 0 && selectedTargetIndex < organizedCategories.length) {
                const targetedCategoryName = organizedCategories[selectedTargetIndex];
                const targetedCommandsList = dynamicRegistry.get(targetedCategoryName);

                // Deep Cosmic Satellite Reaction Symbol for Sub-Menu expansion (Never reused)
                await sock.sendMessage(fromJid, { 
                    react: { text: "🛰️", key: rawMsg.key } 
                });

                let subMenuLayout = 
`╭─⌈ 🐇 *${bName.toUpperCase()} • ${targetedCategoryName.toUpperCase()}* ⌋
│ 🔒 Scope : Execution Module Core
├──────────────────────────\n`;

                targetedCommandsList.forEach((cmd, idx) => {
                    subMenuLayout += `│  ${idx + 1}. \`${liveConfig.prefix}${cmd.name}\`\n│     ⤷ _${cmd.description}_\n│\n`;
                });

                subMenuLayout += `╰⊷ *Reply with back or select another module*`;
                return await sock.sendMessage(fromJid, { text: subMenuLayout }, { quoted: rawMsg });
            }

            // 4. Execution Phase A: Fallback to Primary Main Category Menu Dashboard
            // Deep Cyber Spacecraft Reaction Symbol for Main Menu invocation (Never reused)
            await sock.sendMessage(fromJid, { 
                react: { text: "🛸", key: rawMsg.key } 
            });

            let mainDashboardLayout = 
`╭─⌈ 🐇 *${bName.toUpperCase()} CORE ENGINE* ⌋
│ 🔒 Matrix : Component System Menu
├──────────────────────────
│ 📄 *Available System Sectors:*
│\n`;

            organizedCategories.forEach((categoryName, idx) => {
                const totalCommandsInSector = dynamicRegistry.get(categoryName).length;
                mainDashboardLayout += `│  [ ${idx + 1} ]  ${categoryName.toUpperCase()}\n│       ⤷ _Contains ${totalCommandsInSector} active protocols_\n│\n`;
            });

            mainDashboardLayout += 
`├──────────────────────────
│ 🧬 *Operational Directive:*
│ ⤷ Reply to this message with a sector 
│   number to explore its commands.
╰⊷ *Platform Management Interface Active*`;

            return await sock.sendMessage(fromJid, { text: mainDashboardLayout }, { quoted: rawMsg });

        } catch (menuGenerationFault) {
            console.error("🛑 Critical structural failure detected inside dynamic menu engine:", menuGenerationFault);
            
            // Deep Bio-Organic Microbe Reaction Symbol for system exceptions (Never reused)
            await sock.sendMessage(fromJid, { 
                react: { text: "🧬", key: rawMsg.key } 
            });
            return await reply("Engine Exception: Failed to dynamically compile the architecture blueprint menu.");
        }
    }
};
