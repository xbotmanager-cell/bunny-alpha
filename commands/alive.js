/**
 * BUNNY ALPHA - SYSTEM VITALITY STATUS MANAGER
 * 100% English Codebase | Dynamic Diagnostic Telemetry
 * Simplified Wireframe Menu | Unique Symbolic Transitions
 */

module.exports = {
    name: 'alive',
    category: 'utility',
    description: 'Verify system active presence and display core operational diagnostics.',
    execute: async ({ sock, rawMsg, fromJid, bName, liveConfig, reply }) => {
        try {
            const startTime = Date.now();

            // Completely unique Quantum Signal Pulse Reaction Symbol (Never reused)
            await sock.sendMessage(fromJid, { 
                react: { text: "🌌", key: rawMsg.key } 
            });

            // Extract core server runtime parameters safely
            const systemUptimeSeconds = process.uptime();
            const formatDays = Math.floor(systemUptimeSeconds / (3600 * 24));
            const formatHours = Math.floor((systemUptimeSeconds % (3600 * 24)) / 3600);
            const formatMins = Math.floor((systemUptimeSeconds % 3600) / 60);
            
            const activeUptimeString = `${formatDays}d ${formatHours}h ${formatMins}m`;
            const durationMs = Date.now() - startTime;

            const activePrefix = liveConfig.prefix || ".";
            const totalCommandsRegistered = 18; 

            // Super simple, clean, and meaningful wireframe layout with no useless paragraphs
            const minimalVitalSignsCard = 
`╭─⌈ 🐇 *${bName} IDENTITY* ⌋
│ 📶 Connectivity : ACTIVE
│ ⏱️ Core Latency : ${durationMs}ms
├──────────────────────────
│ ⏳ Host Uptime  : ${activeUptimeString}
│ ⚙️ System Prefix: [ ${activePrefix} ]
│ 🗃️ Loaded Cores: ${totalCommandsRegistered} Engines
╰⊷ *Active Core Engine Operational*`;

            // Direct return using text channel exclusively - no media pipeline overhead
            return await sock.sendMessage(fromJid, { text: minimalVitalSignsCard }, { quoted: rawMsg });

        } catch (vitalityFault) {
            console.error("🛑 Structural failure within platform vitality check orchestration module:", vitalityFault);
            
            // Completely unique Nuclear Radiation Warning Reaction Symbol for errors (Never reused)
            await sock.sendMessage(fromJid, { 
                react: { text: "☣️", key: rawMsg.key } 
            });
            return await reply("Engine Exception: Failed to generate system status telemetry payload.");
        }
    }
};
