/**
 * BUNNY ALPHA - ANTI-DELETE INTEGRATED COMMAND CONTROLLER (EXTENDED EDITION)
 * 100% English Codebase | Dynamic Live Database Orchestration
 * Unified Framework Menu, Configuration Switcher & Deep Symbol Reactions Engine
 */

module.exports = {
    name: 'antidelete',
    category: 'security',
    description: 'Manage anti-delete protection matrix and recovery routing targets.',
    execute: async ({ sock, rawMsg, fromJid, args, isOwner, liveConfig, bName, db, reply }) => {
        try {
            // Enforce strict security access parameters - Only authorized administrators can alter database matrix
            if (!isOwner) {
                // Trigger a structural defensive reaction symbol (Refusal Lock)
                await sock.sendMessage(fromJid, { 
                    react: { text: "𓋹", key: rawMsg.key } 
                });
                return await reply("Access Denied: Administrative privileges required to alter protection layers.");
            }

            // Extract action sub-arguments from the execution payload string
            const subAction = args[0] ? args[0].toLowerCase() : null;
            const startTime = Date.now();

            // Configuration Switcher Channel: Handles activation and deactivation states
            if (subAction === 'on' || subAction === 'off') {
                const targetState = subAction === 'on';
                await db.updateSetting('antiDelete', targetState);

                const stateString = targetState ? "ACTIVATED" : "DEACTIVATED";
                const durationMs = Date.now() - startTime;

                // Deep Mythical Trident Symbol Reaction for Switch Success (Aquaman / Poseidon Aura)
                await sock.sendMessage(fromJid, { 
                    react: { text: "🔱", key: rawMsg.key } 
                });

                // Extended rounded-corner confirmation card layout
                const switchConfirmationCard = 
`╭─⌈ 🐇 *${bName} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🔒 Module : Anti-Delete Controller
│ 📊 Change : Core Infrastructure State
│ 📈 Status : SUCCESSFULLY ${stateString}
├──────────────────────────
│ 🧬 _The protection matrix has been verified_
│ _and re-synchronized with the active map_
│ _cache layer instantly._
╰⊷ *Platform Parameter Update Secure*`;

                return await sock.sendMessage(fromJid, { text: switchConfirmationCard }, { quoted: rawMsg });
            }

            // Destination Routing Channel: Handles output mapping destinations (same or dm)
            if (subAction === 'same' || subAction === 'dm') {
                await db.updateSetting('antiDeleteDestination', subAction);

                const destinationString = subAction === 'same' 
                    ? "ORIGINAL SOURCE CHANNEL" 
                    : "HOST DIRECT MESSAGE INBOX";
                const durationMs = Date.now() - startTime;

                // Deep Mythical Ocean Crown Symbol Reaction for Routing Success
                await sock.sendMessage(fromJid, { 
                    react: { text: "👑", key: rawMsg.key } 
                });

                // Extended rounded-corner routing confirmation card layout
                const routingConfirmationCard = 
`╭─⌈ 🐇 *${bName} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🔒 Module : Anti-Delete Controller
│ 🗺️ Change : Target Recovery Routing
│ 📍 Target : ${destinationString}
├──────────────────────────
│ 🧬 _The active signal intercept destination_
│ _has been hot-swapped within MongoDB_
│ _and cleared through memory pipelines._
╰⊷ *Platform Parameter Update Secure*`;

                return await sock.sendMessage(fromJid, { text: routingConfirmationCard }, { quoted: rawMsg });
            }

            // Deep Mythical Scanning Eye Symbol Reaction when opening the primary setup board
            await sock.sendMessage(fromJid, { 
                react: { text: "🧿", key: rawMsg.key } 
            });

            // Unified Configuration Status Dashboard - Displays interactive instruction panel with rounded architectural styling
            const currentSwitch = liveConfig.antiDelete ? "ENABLED" : "DISABLED";
            const currentTarget = liveConfig.antiDeleteDestination.toUpperCase();

            const interactiveMenu = 
`╭─⌈ 🐇 *${bName} CORE* ⌋
│ 🔒 Module : Anti-Delete Controller
│ 📊 Status : ${currentSwitch}
│ 📍 Target : ${currentTarget}
├──────────────────────────
│ 📄 *Operational Directives:*
│
│ 🛠️ _Toggle System Switch:_
│ ⤷ \`${liveConfig.prefix}antidelete on\`
│ ⤷ \`${liveConfig.prefix}antidelete off\`
│
│ 🌐 _Reroute Interception Target:_
│ ⤷ \`${liveConfig.prefix}antidelete same\`
│     (Sends inside original source chat)
│ ⤷ \`${liveConfig.prefix}antidelete dm\`
│     (Redirects alerts into your inbox)
╰⊷ *Platform Management Interface Active*`;

            // Direct return call utilizing the exact rounded-corner architecture frame
            return await sock.sendMessage(fromJid, { text: interactiveMenu }, { quoted: rawMsg });

        } catch (commandExecutionError) {
            console.error("🛑 Structural failure detected within anti-delete configuration pipeline:", commandExecutionError);

            // Error state fallback reaction (Deep Ancient Cross)
            await sock.sendMessage(fromJid, { 
                react: { text: "❌", key: rawMsg.key } 
            });

            return await reply("Engine Exception: Failed to synchronize parameters with the database registry.");
        }
    }
};
