/**
 * BUNNY ALPHA - PROFILE PICTURE IDENTITY MANAGER COMMAND
 * 100% English Codebase | Dynamic Media Stream Deconstruction
 * Super Simple Wireframe Output Layout | Unique Symbolic Transitions
 */

const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'setbotpic',
    category: 'owner',
    description: 'Change the running profile picture image of the bot identity instantly.',
    execute: async ({ sock, rawMsg, fromJid, args, isOwner, bName, reply }) => {
        try {
            // Enforce strict security access parameters - Only authorized administrators can alter bot profile image
            if (!isOwner) {
                await sock.sendMessage(fromJid, { 
                    react: { text: "🏔️", key: rawMsg.key } 
                });
                return await reply("Access Denied: Administrative privileges required.");
            }

            // Determine if the target image is inside a quoted message or directly attached within raw message layer
            const quotedMsgNode = rawMsg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            const isDirectImage = rawMsg.message?.imageMessage;
            const isQuotedImage = quotedMsgNode?.imageMessage;

            if (!isDirectImage && !isQuotedImage) {
                await sock.sendMessage(fromJid, { 
                    react: { text: "🖼️", key: rawMsg.key } 
                });

                const minimalMenu = 
`╭─⌈ 🐇 *${bName} SYSTEM* ⌋
│ 🔒 Module : Avatar Manager
├──────────────────────────
│ 📄 *Operational Directive:*
│ ⤷ Reply to an image or upload one with:
│     \`${bName.toLowerCase()} setbotpic\`
╰⊷ *Interface Standing By*`;

                return await sock.sendMessage(fromJid, { text: minimalMenu }, { quoted: rawMsg });
            }

            const startTime = Date.now();

            // Extract the core image target metadata structural package
            const targetImageNode = isDirectImage ? rawMsg.message.imageMessage : quotedMsgNode.imageMessage;
            
            // Download the active media binary stream matrix directly from WhatsApp secure content nodes
            const streamPipeline = await downloadContentFromMessage(targetImageNode, 'image');
            let mediaStorageBuffer = Buffer.from([]);
            for await (const chunk of streamPipeline) {
                mediaStorageBuffer = Buffer.concat([mediaStorageBuffer, chunk]);
            }

            // Execute absolute structural profile picture modification within Baileys engine layer
            const selfJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            await sock.updateProfilePicture(selfJid, mediaStorageBuffer);
            
            const durationMs = Date.now() - startTime;

            // Completely unique Camera Lens Flare Reaction Symbol for profile image modifications
            await sock.sendMessage(fromJid, { 
                react: { text: "📸", key: rawMsg.key } 
            });

            // Super minimal rounded avatar card response
            const successCard = 
`╭─⌈ 🐇 *${bName} ENGINE* ⌋
│ ⏱️ Speed  : ${durationMs}ms
├──────────────────────────
│ 🧬 Change : Avatar Profile Image
│ 📈 Status : PROFILE AVATAR UPDATED
╰⊷ *Platform Parameter Update Secure*`;

            return await sock.sendMessage(fromJid, { text: successCard }, { quoted: rawMsg });

        } catch (botPicUpdateFault) {
            console.error("🛑 Structural failure within bot profile picture orchestration module:", botPicUpdateFault);
            await sock.sendMessage(fromJid, { 
                react: { text: "💥", key: rawMsg.key } 
            });
            return await reply("Engine Exception: Failed to alter running avatar signature layout.");
        }
    }
};
