/**
 * BUNNY ALPHA - BOT IDENTITY MANAGER COMMAND
 * 100% English Codebase | Dynamic Live Database Orchestration
 * Super Simple Wireframe Output Layout | Unique Symbolic Transitions
 */

module.exports = {
    name: 'setbotname',
    category: 'owner',
    description: 'Change the running identity name of the system instantly.',
    execute: async ({ sock, rawMsg, fromJid, args, isOwner, bName, db, reply }) => {
        try {
            // Enforce strict security access parameters - Only authorized administrators can alter bot identity
            if (!isOwner) {
                await sock.sendMessage(fromJid, { 
                    react: { text: "🏔️", key: rawMsg.key } 
                });
                return await reply("Access Denied: Administrative privileges required.");
            }

            // Extract all arguments together to support multi-word name strings safely
            const newBotNameInput = args.join(" ").trim();

            // If no new identity text is specified, trigger help signpost board
            if (!newBotNameInput) {
                await sock.sendMessage(fromJid, { 
                    react: { text: "🧩", key: rawMsg.key } 
                });

                const minimalMenu = 
`╭─⌈ 🐇 *${bName} SYSTEM* ⌋
│ 🔒 Module : Identity Manager
├──────────────────────────
│ 📄 *Operational Directive:*
│ ⤷ \`setbotname [new name]\`
│
│ _Example: setbotname WOLFBOT_
╰⊷ *Interface Standing By*`;

                return await sock.sendMessage(fromJid, { text: minimalMenu }, { quoted: rawMsg });
            }

            const startTime = Date.now();
            
            // Execute absolute structural identity rewrite within database registry and cache spaces
            await db.updateSetting('botName', newBotNameInput);
            const durationMs = Date.now() - startTime;

            // Completely unique Mythical Artifact Reaction Symbol for name transformation
            await sock.sendMessage(fromJid, { 
                react: { text: "🔮", key: rawMsg.key } 
            });

            // Super minimal rounded identity modification card
            const successCard = 
`╭─⌈ 🐇 *${newBotNameInput} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🧬 Change : Identity Protocol Set
│ 📈 Status : BOT NAME IS NOW [ ${newBotNameInput} ]
╰⊷ *Platform Parameter Update Secure*`;

            return await sock.sendMessage(fromJid, { text: successCard }, { quoted: rawMsg });

        } catch (botNameUpdateFault) {
            console.error("🛑 Structural failure within bot identity orchestration module:", botNameUpdateFault);
            await sock.sendMessage(fromJid, { 
                react: { text: "⚡", key: rawMsg.key } 
            });
            return await reply("Engine Exception: Failed to alter running identity signature.");
        }
    }
};
