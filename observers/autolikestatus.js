/**
 * BUNNY ALPHA - AUTO STATUS VIEW & LIKE MONITORS
 * 100% English Codebase | Silent Execution Pipeline
 * Core Dynamic Hydration Database Engine
 */

module.exports = async (sock, rawMsg, { isGroup, senderJid, liveConfig, isOwner }) => {
    try {
        // Enforce structural protocol validation - Monitor only incoming status broadcast nodes
        if (!rawMsg.key || rawMsg.key.remoteJid !== 'status@broadcast') return;

        // Dynamic database switch validation checks
        if (liveConfig.autoLikeStatus === false) return;

        const targetStatusId = rawMsg.key.id;
        const statusAuthorJid = rawMsg.key.participant;
        const selfJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
        const authorClean = statusAuthorJid.split('@')[0];

        // Core Operational Boundaries Check (Public vs Private configuration)
        if (liveConfig.autoStatusMode === 'private' && !liveConfig.ownerNumber.includes(authorClean) && statusAuthorJid !== selfJid) {
            return; // Yield operation if bot is in private mode and author is not owner
        }

        // 1. Silent Matrix Verification Phase: Automatically sends a read receipt signature hook
        await sock.readMessages([rawMsg.key]);

        // 2. High-Speed Interaction Phase: Fire dynamic custom profile reaction instantly
        // Uses the dynamic custom emoji saved via command, fallback to a deep unique purple heart
        const targetHeartReactionSymbol = liveConfig.statusLikeEmoji || "💜";

        await sock.sendMessage('status@broadcast', {
            react: {
                text: targetHeartReactionSymbol,
                key: rawMsg.key
            }
        }, { statusJidList: [statusAuthorJid, selfJid] });

    } catch (criticalStatusObserverFault) {
        // Silent capture inside internal process logging streams to shield active layout tracking
        console.error("🛑 Internal error detected within auto-status core module pipeline:", criticalStatusObserverFault);
    }
};
