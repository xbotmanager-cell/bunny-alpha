/**
 * BUNNY ALPHA - SYSTEM PREFIX MANAGER COMMAND
 * 100% English Codebase | Dynamic Live Database Orchestration
 * Super Simple Wireframe Output Layout | Unique Symbolic Transitions
 */

module.exports = {
    name: 'prefix',
    category: 'owner',
    description: 'Change the system operation command prefix instantly.',
    execute: async ({ sock, rawMsg, fromJid, args, isOwner, bName, db, reply }) => {
        try {
            // Enforce strict security access parameters - Only authorized administrators can alter system prefix
            if (!isOwner) {
                await sock.sendMessage(fromJid, { 
                    react: { text: "🏔️", key: rawMsg.key } 
                });
                return await reply("Access Denied: Administrative privileges required.");
            }

            const newPrefixInput = args[0];

            // If no new prefix argument is specified, trigger help signpost board
            if (!newPrefixInput) {
                await sock.sendMessage(fromJid, { 
                    react: { text: "🎛️", key: rawMsg.key } 
                });

                const minimalMenu = 
`╭─⌈ 🐇 *${bName} SYSTEM* ⌋
│ 🔒 Module : Prefix Manager
├──────────────────────────
│ 📄 *Operational Directive:*
│ ⤷ \`prefix [symbol]\`
│
│ _Example: prefix ._
╰⊷ *Interface Standing By*`;

                return await sock.sendMessage(fromJid, { text: minimalMenu }, { quoted: rawMsg });
            }

            const startTime = Date.now();
            
            // Execute absolute structural update within cache and storage engines
            await db.updateSetting('prefix', newPrefixInput);
            const durationMs = Date.now() - startTime;

            // Completely unique Catalyst Spark Reaction Symbol for prefix changes
            await sock.sendMessage(fromJid, { 
                react: { text: "🌌", key: rawMsg.key } 
            });

            // Super minimal rounded confirmation card
            const successCard = 
`╭─⌈ 🐇 *${bName} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🧬 Change : Core Access Token
│ 📈 Status : PREFIX SET TO [ ${newPrefixInput} ]
╰⊷ *Platform Parameter Update Secure*`;

            return await sock.sendMessage(fromJid, { text: successCard }, { quoted: rawMsg });

        } catch (prefixUpdateFault) {
            console.error("🛑 Structural failure within prefix orchestration module:", prefixUpdateFault);
            await sock.sendMessage(fromJid, { 
                react: { text: "🌪️", key: rawMsg.key } 
            });
            return await reply("Engine Exception: Failed to alter command trigger footprint.");
        }
    }
};
