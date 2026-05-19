/**
 * BUNNY ALPHA - SECURITY ANTI-EDIT INTERCEPTOR MODULE
 * 100% English Codebase | Dynamic Payload Tracking Engine
 * Optimized Wireframe Layout with Deep Mythical Symbol Triggers
 */

const { getContentType } = require('@whiskeysockets/baileys');

module.exports = async (sock, rawMsg, { isGroup, senderJid, liveConfig, isOwner }) => {
    try {
        // Enforce structural protocol validation - intercepted message check
        if (!rawMsg.message) return;

        const targetJid = rawMsg.key.remoteJid;
        const selfJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const isStatusRoute = targetJid === 'status@broadcast';

        // 1. Packet Interception Phase: Cache original messages before they get modified
        if (!rawMsg.message.protocolMessage && !rawMsg.message.editedMessage) {
            const msgId = rawMsg.key.id;
            
            global.messageBufferMatrix = global.messageBufferMatrix || new Map();
            
            global.messageBufferMatrix.set(msgId, {
                message: rawMsg.message,
                key: rawMsg.key,
                sender: senderJid,
                pushName: rawMsg.pushName || "Unknown Signal",
                timestamp: rawMsg.messageTimestamp
            });
            return;
        }

        // 2. Identification Phase: Intercept protocol messages containing edits (Type 14 = Edit Protocol)
        const protocolMsg = rawMsg.message.protocolMessage;
        if (protocolMsg && protocolMsg.type === 14) {
            
            // Database-driven switch check (Editable direct from WhatsApp via configuration)
            if (liveConfig.antiEdit === false) return; 

            const targetEditId = protocolMsg.key.id;
            const savedPacket = global.messageBufferMatrix ? global.messageBufferMatrix.get(targetEditId) : null;
            
            if (!savedPacket) return; // Yield if message packet has already been cleared from the memory matrix

            const culpritClean = savedPacket.sender.split('@')[0];
            const identityLabel = savedPacket.pushName;
            
            // Extract the newly modified/edited message object payload
            const editedMessageRoot = protocolMsg.editedMessage;
            if (!editedMessageRoot) return;

            // Route execution handling based on active database configuration rules
            let destinationJid = targetJid;
            if (liveConfig.antiEditDestination === 'dm' || liveConfig.antiDeleteDestination === 'dm') {
                destinationJid = selfJid;
            }
            if (isStatusRoute) destinationJid = selfJid;

            let contextTrace = isGroup ? `Group context: +${targetJid.split('@')[0]}` : `Direct Message Channel`;
            if (isStatusRoute) contextTrace = `Status Broadcast Timeline Log`;

            // Trigger a structural defensive reaction symbol (Deep Ancient Crown for intercept success)
            await sock.sendMessage(targetJid, { 
                react: { text: "🧿", key: rawMsg.key } 
            });

            // Deconstruct Content Types for both versions safely
            const oldType = getContentType(savedPacket.message);
            const newType = getContentType(editedMessageRoot);

            // Extract text string values safely from both message states
            const originalText = savedPacket.message.conversation || savedPacket.message.extendedTextMessage?.text || "[Media/Unsupported Packet]";
            const modifiedText = editedMessageRoot.conversation || editedMessageRoot.extendedTextMessage?.text || "[Media/Unsupported Packet]";

            // Build structural rounded wireframe interface layout text blocks
            const wireframeHeader = 
`╭─⌈ 🐇 *${liveConfig.botName}* ⌋
│ 🔒 Action  : Message Modification Caught
│ 👥 Culprit : @${culpritClean} (${identityLabel})
│ 🌐 Scope   : ${contextTrace}
├──────────────────────────`;

            const wireframeFooter = 
`╰⊷ *${liveConfig.botName} Engine Recovery Active*`;

            // Process text modifications logs instantly
            if ((oldType === 'conversation' || oldType === 'extendedTextMessage') && 
                (newType === 'conversation' || newType === 'extendedTextMessage')) {
                
                const responsePayload = 
`${wireframeHeader}
│ 📄 *Original Text:*
│ ⤷ ${originalText}
│
│ 📝 *Edited Text:*
│ ⤷ ${modifiedText}
${wireframeFooter}`;

                return await sock.sendMessage(destinationJid, {
                    text: responsePayload,
                    mentions: [savedPacket.sender]
                });
            }
        }
    } catch (criticalObserverFault) {
        console.error("🛑 Critical system tracking error inside antiEdit pipeline module:", criticalObserverFault);
    }
};
