/**
 * BUNNY ALPHA - ANTI-EDIT INTEGRATED COMMAND CONTROLLER (EXTENDED EDITION)
 * 100% English Codebase | Dynamic Live Database Orchestration
 * Unified Framework Menu, Configuration Switcher & Deep Unique Symbol Reactions Engine
 */

module.exports = {
    name: 'antiedit',
    category: 'security',
    description: 'Manage anti-edit protection matrix and modification recovery routing targets.',
    execute: async ({ sock, rawMsg, fromJid, args, isOwner, liveConfig, bName, db, reply }) => {
        try {
            // Enforce strict security access parameters - Only authorized administrators can alter database matrix
            if (!isOwner) {
                // Trigger a completely unique structural defensive reaction symbol (Ancient Seal Lock)
                await sock.sendMessage(fromJid, { 
                    react: { text: "🧱", key: rawMsg.key } 
                });
                return await reply("Access Denied: Administrative privileges required to alter protection layers.");
            }

            // Extract action sub-arguments from the execution payload string
            const subAction = args[0] ? args[0].toLowerCase() : null;
            const startTime = Date.now();

            // Configuration Switcher Channel: Handles activation and deactivation states
            if (subAction === 'on' || subAction === 'off') {
                const targetState = subAction === 'on';
                await db.updateSetting('antiEdit', targetState);

                const stateString = targetState ? "ACTIVATED" : "DEACTIVATED";
                const durationMs = Date.now() - startTime;

                // Unique Galactic Spark Symbol Reaction for Switch Success (Never reused)
                await sock.sendMessage(fromJid, { 
                    react: { text: "🎇", key: rawMsg.key } 
                });

                // Extended rounded-corner confirmation card layout
                const switchConfirmationCard = 
`╭─⌈ 🐇 *${bName} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🔒 Module : Anti-Edit Controller
│ 📊 Change : Core Infrastructure State
│ 📈 Status : SUCCESSFULLY ${stateString}
├──────────────────────────
│ 🧬 _The modification tracker has been verified_
│ _and re-synchronized with the active map_
│ _cache layer instantly._
╰⊷ *Platform Parameter Update Secure*`;

                return await sock.sendMessage(fromJid, { text: switchConfirmationCard }, { quoted: rawMsg });
            }

            // Destination Routing Channel: Handles output mapping destinations (same or dm)
            if (subAction === 'same' || subAction === 'dm') {
                await db.updateSetting('antiEditDestination', subAction);

                const destinationString = subAction === 'same' 
                    ? "ORIGINAL SOURCE CHANNEL" 
                    : "HOST DIRECT MESSAGE INBOX";
                const durationMs = Date.now() - startTime;

                // Unique Anchored Matrix Symbol Reaction for Routing Success (Never reused)
                await sock.sendMessage(fromJid, { 
                    react: { text: "⚓", key: rawMsg.key } 
                });

                // Extended rounded-corner routing confirmation card layout
                const routingConfirmationCard = 
`╭─⌈ 🐇 *${bName} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🔒 Module : Anti-Edit Controller
│ 🗺️ Change : Target Recovery Routing
│ 📍 Target : ${destinationString}
├──────────────────────────
│ 🧬 _The active update intercept destination_
│ _has been hot-swapped within MongoDB_
│ _and cleared through memory pipelines._
╰⊷ *Platform Parameter Update Secure*`;

                return await sock.sendMessage(fromJid, { text: routingConfirmationCard }, { quoted: rawMsg });
            }

            // Unique Telemetry Radar Symbol Reaction when opening the setup board (Never reused)
            await sock.sendMessage(fromJid, { 
                react: { text: "📡", key: rawMsg.key } 
            });

            // Unified Configuration Status Dashboard - Displays interactive instruction panel with rounded architectural styling
            const currentSwitch = liveConfig.antiEdit !== false ? "ENABLED" : "DISABLED";
            const currentTarget = (liveConfig.antiEditDestination || liveConfig.antiDeleteDestination || "SAME").toUpperCase();

            const interactiveMenu = 
`╭─⌈ 🐇 *${bName} CORE* ⌋
│ 🔒 Module : Anti-Edit Controller
│ 📊 Status : ${currentSwitch}
│ 📍 Target : ${currentTarget}
├──────────────────────────
│ 📄 *Operational Directives:*
│
│ 🛠️ _Toggle System Switch:_
│ ⤷ \`${liveConfig.prefix}antiedit on\`
│ ⤷ \`${liveConfig.prefix}antiedit off\`
│
│ 🌐 _Reroute Interception Target:_
│ ⤷ \`${liveConfig.prefix}antiedit same\`
│     (Sends inside original source chat)
│ ⤷ \`${liveConfig.prefix}antiedit dm\`
│     (Redirects alerts into your inbox)
╰⊷ *Platform Management Interface Active*`;

            // Direct return call utilizing the exact rounded-corner architecture frame
            return await sock.sendMessage(fromJid, { text: interactiveMenu }, { quoted: rawMsg });

        } catch (commandExecutionError) {
            console.error("🛑 Structural failure detected within anti-edit configuration pipeline:", commandExecutionError);

            // Completely unique Error state fallback reaction (Ancient Warning Biohazard Signal)
            await sock.sendMessage(fromJid, { 
                react: { text: "☣️", key: rawMsg.key } 
            });

            return await reply("Engine Exception: Failed to synchronize parameters with the database registry.");
        }
    }
};
