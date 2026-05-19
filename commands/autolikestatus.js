/**
 * BUNNY ALPHA - AUTO-STATUS CORE COMMAND CONTROLLER
 * 100% English Codebase | Dynamic Live Database Orchestration
 * Comprehensive Switcher Panel with Deep Mythical Non-Repeating Symbolic Matrices
 */

module.exports = {
    name: 'autostatus',
    category: 'automation',
    description: 'Control automated status viewing, reading receipts, and dynamic profile reactions execution.',
    execute: async ({ sock, rawMsg, fromJid, args, isOwner, liveConfig, bName, db, reply }) => {
        try {
            // Enforce strict security access parameters - Only authorized administrators can alter database metrics
            if (!isOwner) {
                // Completely unique structural defensive reaction symbol (Ancient Shield Wall)
                await sock.sendMessage(fromJid, { 
                    react: { text: "🛡️", key: rawMsg.key } 
                });
                return await reply("Access Denied: Administrative privileges required to alter protection layers.");
            }

            const subAction = args[0] ? args[0].toLowerCase() : null;
            const startTime = Date.now();

            // Configuration Switcher Channel: Handles activation states
            if (subAction === 'on' || subAction === 'off') {
                const targetState = subAction === 'on';
                await db.updateSetting('autoLikeStatus', targetState);
                
                const stateString = targetState ? "ACTIVATED" : "DEACTIVATED";
                const durationMs = Date.now() - startTime;

                // Completely unique Cyber Hourglass Symbol Reaction for Switch Success (Never reused)
                await sock.sendMessage(fromJid, { 
                    react: { text: "⏳", key: rawMsg.key } 
                });

                const switchConfirmationCard = 
`╭─⌈ 🐇 *${bName} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🔒 Module : Auto-Status Monitor
│ 📊 Change : System Interface State
│ 📈 Status : SUCCESSFULLY ${stateString}
├──────────────────────────
│ 🧬 _The background status dynamic listener_
│ _has been successfully re-aligned within_
│ _the running system engine configuration._
╰⊷ *Platform Parameter Update Secure*`;

                return await sock.sendMessage(fromJid, { text: switchConfirmationCard }, { quoted: rawMsg });
            }

            // Execution Target Boundary Switcher: Handles (public or private status target maps)
            if (subAction === 'public' || subAction === 'private') {
                await db.updateSetting('autoStatusMode', subAction);
                const durationMs = Date.now() - startTime;

                // Completely unique Cyber Infinity Symbol Reaction for Mode Locking (Never reused)
                await sock.sendMessage(fromJid, { 
                    react: { text: "♾️", key: rawMsg.key } 
                });

                const scopeConfirmationCard = 
`╭─⌈ 🐇 *${bName} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🔒 Module : Auto-Status Monitor
│ 🗺️ Change : Targeting Boundary Set
│ 📍 Mode   : ${subAction.toUpperCase()} NETWORK
├──────────────────────────
│ 🧬 _The running status verification matrix_
│ _has been re-scoped to track target logs_
│ _inside specified boundaries instantly._
╰⊷ *Platform Parameter Update Secure*`;

                return await sock.sendMessage(fromJid, { text: scopeConfirmationCard }, { quoted: rawMsg });
            }

            // Custom Interaction Signature Swap Engine: Handles heart icon target modifications
            if (subAction === 'setemoji' && args[1]) {
                const chosenEmojiInput = args[1];
                await db.updateSetting('statusLikeEmoji', chosenEmojiInput);
                const durationMs = Date.now() - startTime;

                // Completely unique Alchemical Diamond Spark/Crystal Symbol Reaction (Never reused)
                await sock.sendMessage(fromJid, { 
                    react: { text: "🔮", key: rawMsg.key } 
                });

                const emojiConfirmationCard = 
`╭─⌈ 🐇 *${bName} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🔒 Module : Auto-Status Monitor
│ 💎 Change : Custom Reaction Marker
│ 🎨 Token  : ${chosenEmojiInput}
├──────────────────────────
│ 🧬 _The active interaction signature token_
│ _has been customized across runtime map_
│ _layers and hot-swapped within MongoDB._
╰⊷ *Platform Parameter Update Secure*`;

                return await sock.sendMessage(fromJid, { text: emojiConfirmationCard }, { quoted: rawMsg });
            }

            // Completely unique Compass Rose Symbol Reaction when calling the default menu layout board (Never reused)
            await sock.sendMessage(fromJid, { 
                react: { text: "🧭", key: rawMsg.key } 
            });

            // Unified Configuration Status Dashboard Panel
            const currentSwitch = liveConfig.autoLikeStatus ? "ENABLED" : "DISABLED";
            const currentScope = (liveConfig.autoStatusMode || "PUBLIC").toUpperCase();
            const activeMarker = liveConfig.statusLikeEmoji || "💜";

            const interactiveMenu = 
`╭─⌈ 🐇 *${bName} CORE* ⌋
│ 🔒 Module : Auto-Status Matrix
│ 📊 Status : ${currentSwitch}
│ 🗺️ Boundary: ${currentScope}
│ 🎨 Emblem : ${activeMarker}
├──────────────────────────
│ 📄 *Operational Directives:*
│
│ 🛠️ _Toggle Monitor Switch:_
│ ⤷ \`${liveConfig.prefix}autostatus on\`
│ ⤷ \`${liveConfig.prefix}autostatus off\`
│
│ 🌐 _Adjust Network Boundary Scope:_
│ ⤷ \`${liveConfig.prefix}autostatus public\`
│     (Likes everyone's status uploads)
│ ⤷ \`${liveConfig.prefix}autostatus private\`
│     (Likes only status files from Owner)
│
│ 💎 _Modify Active Reaction Token:_
│ ⤷ \`${liveConfig.prefix}autostatus setemoji [emoji]\`
│     (Changes the active like signature)
╰⊷ *Platform Management Interface Active*`;

            return await sock.sendMessage(fromJid, { text: interactiveMenu }, { quoted: rawMsg });

        } catch (commandExecutionError) {
            console.error("🛑 Structural failure detected within status setup configuration pipeline:", commandExecutionError);
            
            // Completely unique Radioactive Warning Signal Reaction for Errors (Never reused)
            await sock.sendMessage(fromJid, { 
                react: { text: "☢️", key: rawMsg.key } 
            });
            return await reply("Engine Exception: Failed to synchronize parameters with the database registry.");
        }
    }
};
