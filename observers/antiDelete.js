/**
 * BUNNY ALPHA - SECURITY ANTI-DELETE & ANTI-VIEWONCE INTERCEPTOR
 * 100% English Codebase | Dynamic Storage Extraction
 * Optimized Wireframe Layout Output Format
 */

const { downloadContentFromMessage, getContentType } = require('@whiskeysockets/baileys');
const fs = require('fs-extra');
const path = require('path');

// Memory buffer container tracking messages for instant rollback capability
global.messageBufferMatrix = global.messageBufferMatrix || new Map();

module.exports = async (sock, rawMsg, { isGroup, senderJid, liveConfig, isOwner }) => {
    try {
        // Intercept incoming updates to save copies into database memory matrix
        if (rawMsg.message && !rawMsg.message.protocolMessage) {
            const msgId = rawMsg.key.id;
            
            // Clean viewOnce flags to force permanent visualization visibility parameters
            let actualMessage = rawMsg.message;
            if (actualMessage.viewOnceMessage) actualMessage = actualMessage.viewOnceMessage.message;
            if (actualMessage.viewOnceMessageV2) actualMessage = actualMessage.viewOnceMessageV2.message;
            if (actualMessage.viewOnceMessageV3) actualMessage = actualMessage.viewOnceMessageV3.message;

            global.messageBufferMatrix.set(msgId, {
                message: actualMessage,
                key: rawMsg.key,
                sender: senderJid,
                pushName: rawMsg.pushName || "Target Protocol",
                timestamp: rawMsg.messageTimestamp
            });

            // Prevent buffer saturation leakage on high volume Render engine operations
            if (global.messageBufferMatrix.size > 2000) {
                const oldestKey = global.messageBufferMatrix.keys().next().value;
                global.messageBufferMatrix.delete(oldestKey);
            }
        }

        // Intercept protocol deletion commands triggers
        if (rawMsg.message && rawMsg.message.protocolMessage && rawMsg.message.protocolMessage.type === 0) {
            if (!liveConfig.antiDelete) return; // Exit script sequence execution if disabled inside MongoDB configurations
            
            const targetDeletionId = rawMsg.message.protocolMessage.key.id;
            const savedPacket = global.messageBufferMatrix.get(targetDeletionId);
            
            if (!savedPacket) return; // Yield operation if data packets expired from cache layout arrays

            const targetJid = rawMsg.key.remoteJid;
            const selfJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            const isStatusRoute = targetJid === 'status@broadcast';
            
            const culpritClean = savedPacket.sender.split('@')[0];
            const identityLabel = savedPacket.pushName;
            
            // Dynamic destination routing mapping selector
            let destinationJid = targetJid;
            if (liveConfig.antiDeleteDestination === 'dm') destinationJid = selfJid;
            if (isStatusRoute) destinationJid = selfJid;

            // Wireframe framework string data generation block
            let contextTrace = isGroup ? `Group context: +${targetJid.split('@')[0]}` : `Direct Message Channel`;
            if (isStatusRoute) contextTrace = `Status Broadcast Timeline Log`;

            const wireframeHeader = 
`╭─⌈ 🐇 *${liveConfig.botName}* ⌋
│ 🔒 Action  : Message Purge Intercepted
│ 👥 Culprit : @${culpritClean} (${identityLabel})
│ 🌐 Scope   : ${contextTrace}
├──────────────────────────`;

            const wireframeFooter = 
`╰⊷ *${liveConfig.botName} Engine Recovery Active*`;

            const mType = getContentType(savedPacket.message);
            
            // Text payload recovery intercept channel
            if (mType === 'conversation' || mType === 'extendedTextMessage') {
                const recoveredText = savedPacket.message.conversation || savedPacket.message.extendedTextMessage?.text || "[Empty Signature]";
                
                return await sock.sendMessage(destinationJid, {
                    text: `${wireframeHeader}\n│ 📄 Message : ${recoveredText}\n${wireframeFooter}`,
                    mentions: [savedPacket.sender]
                });
            }

            // Rich media multi-type automated stream rendering engine
            const executableMediaTypes = ['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage'];
            if (executableMediaTypes.includes(mType)) {
                const mediaDataNode = savedPacket.message[mType];
                const streamPipeline = await downloadContentFromMessage(mediaDataNode, mType.replace('Message', ''));
                
                let mediaStorageBuffer = Buffer.from([]);
                for await (const chunk of streamPipeline) {
                    mediaStorageBuffer = Buffer.concat([mediaStorageBuffer, chunk]);
                }

                // Parse message text descriptions safely
                const mediaCaption = mediaDataNode.caption || "[No Caption Text]";
                const formattedPayloadCaption = `${wireframeHeader}\n│ 📁 Media   : ${mType.replace('Message', '').toUpperCase()}\n│ 📄 Caption : ${mediaCaption}\n${wireframeFooter}`;

                if (mType === 'imageMessage') {
                    return await sock.sendMessage(destinationJid, { image: mediaStorageBuffer, caption: formattedPayloadCaption, mentions: [savedPacket.sender] });
                }
                if (mType === 'videoMessage') {
                    return await sock.sendMessage(destinationJid, { video: mediaStorageBuffer, caption: formattedPayloadCaption, mentions: [savedPacket.sender] });
                }
                if (mType === 'audioMessage') {
                    await sock.sendMessage(destinationJid, { text: formattedPayloadCaption, mentions: [savedPacket.sender] });
                    return await sock.sendMessage(destinationJid, { audio: mediaStorageBuffer, mimetype: mediaDataNode.mimetype, ptt: mediaDataNode.ptt }, { quoted: rawMsg });
                }
                if (mType === 'documentMessage') {
                    await sock.sendMessage(destinationJid, { text: formattedPayloadCaption, mentions: [savedPacket.sender] });
                    return await sock.sendMessage(destinationJid, { document: mediaStorageBuffer, mimetype: mediaDataNode.mimetype, fileName: mediaDataNode.fileName });
                }
            }
        }
    } catch (criticalObserverFault) {
        console.error("🛑 Critical system recovery error inside antiDelete pipeline module:", criticalObserverFault);
    }
};
