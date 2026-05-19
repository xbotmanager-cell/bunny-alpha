/**
 * BUNNY ALPHA - SYSTEM INBOUND TRAFFIC ROUTER (2026 EDITION)
 * 100% English Codebase | Dynamic Payload Deconstruction
 * Zero-Memory Leak Architecture Optimized for Render Free Tier Runtime
 */

const fs = require('fs-extra');
const path = require('path');

// Global structural directory mapping configurations
const paths = {
    commands: path.join(__dirname, '../commands'),
    observers: path.join(__dirname, '../observers')
};

/**
 * Handles, parses, and dispatches incoming message packets dynamically
 * @param {Object} sock - Direct secure Baileys socket link instance
 * @param {Object} chatUpdate - Raw inbound event upsert payload array
 * @param {Object} BotConfig - Mongoose configuration model reference
 */
async function routeInboundMessage(sock, chatUpdate, BotConfig) {
    try {
        if (!chatUpdate.messages || chatUpdate.messages.length === 0) return;
        const rawMsg = chatUpdate.messages[0];
        if (!rawMsg.message) return;

        const fromJid = rawMsg.key.remoteJid;
        const selfJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const selfClean = selfJid.split('@')[0];
        
        // Structural validation variables
        const isGroup = fromJid.endsWith('@g.us');
        const senderJid = isGroup ? (rawMsg.key.participant || fromJid) : fromJid;
        const senderClean = senderJid.split('@')[0];
        
        // Hydrate running configurations instantly from RAM cache variables (0% DB load)
        if (!global.bunnyCache.has(selfClean)) {
            let userConfig = await BotConfig.findOne({ userId: selfClean });
            if (!userConfig) return; // Yield routine until primary engine registers baseline profile
            global.bunnyCache.set(selfClean, userConfig.settings instanceof Map ? Object.fromEntries(userConfig.settings) : userConfig.settings);
        }
        
        const liveConfig = global.bunnyCache.get(selfClean);
        const currentPrefix = liveConfig.prefix;
        const bName = liveConfig.botName;
        
        // Comprehensive string extraction across varied message content profiles
        const msgText = (
            rawMsg.message.conversation || 
            rawMsg.message.extendedTextMessage?.text || 
            rawMsg.message.imageMessage?.caption || 
            rawMsg.message.videoMessage?.caption || ''
        ).trim();

        // Security bypass evaluation - CRITICAL: Completely removes rigid 'fromMe' blocks to empower bot owner requests
        const isOwner = liveConfig.ownerNumber.includes(senderClean) || liveConfig.sudoNumbers.includes(senderClean) || rawMsg.key.fromMe;
        
        // Sequential non-prefixed active runtime observer module distribution loop
        if (fs.existsSync(paths.observers)) {
            const observerFiles = fs.readdirSync(paths.observers).filter(file => file.endsWith('.js'));
            for (const file of observerFiles) {
                try {
                    const observerModule = require(path.join(paths.observers, file));
                    if (typeof observerModule === 'function') {
                        await observerModule(sock, rawMsg, { isGroup, senderJid, liveConfig, isOwner });
                    }
                } catch (obsErr) {
                    console.error(`🛑 Structural router crash on observer [${file}]:`, obsErr);
                }
            }
        }

        // Validate structural prefix matching schema
        const hasPrefix = msgText.startsWith(currentPrefix);
        if (!hasPrefix) return;

        // Apply bot execution boundaries checking (Public, Private, Isolate)
        if (liveConfig.botMode === 'private' && !isOwner) return;
        if (liveConfig.botMode === 'isolate' && !rawMsg.key.fromMe) return;

        // Strip structural token indicators and parse argument strings
        const args = msgText.slice(currentPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // Structural dynamic module path translation loop
        const targetCommandPath = path.join(paths.commands, `${commandName}.js`);
        if (fs.existsSync(targetCommandPath)) {
            // Force strict refresh clearance inside Node runtime cache layer to allow hot module code upgrades without restarts
            delete require.cache[require.resolve(targetCommandPath)];
            const commandModule = require(targetCommandPath);
            
            // Capture process baseline instant to measure operational latency metrics
            const startTime = Date.now();
            
            await commandModule({
                sock,
                rawMsg,
                fromJid,
                args,
                isOwner,
                liveConfig,
                bName,
                db: {
                    updateSetting: async (key, value) => {
                        let doc = await BotConfig.findOne({ userId: selfClean });
                        if (doc) {
                            doc.settings.set(key, value);
                            await doc.save();
                            // Hot sync memory cache space instantly
                            global.bunnyCache.set(selfClean, Object.fromEntries(doc.settings));
                        }
                    }
                },
                reply: async (textString) => {
                    const durationMs = Date.now() - startTime;
                    
                    // Wireframe framework design layout output logic replicating requested aesthetics
                    const responseLayout = 
`┌─⚡  ${bName}  ⚡─┐
│ ⏱️ Speed: ${durationMs}ms
├──────────────────────────
│ ${textString}
└──────────────────────────`;
                    
                    return await sock.sendMessage(fromJid, { text: responseLayout }, { quoted: rawMsg });
                }
            });
        }
    } catch (routerErr) {
        console.error("🛑 Critical intercept failure inside inbound traffic pipeline:", routerErr);
    }
}

module.exports = { routeInboundMessage };
