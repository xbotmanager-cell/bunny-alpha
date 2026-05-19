/**
 * BUNNY ALPHA - MEMORY LAYER AND RUNTIME HYDRATION CACHE (2026 EDITION)
 * 100% English Codebase | Optimized for Render Free Tier RAM Management
 * Prevents continuous MongoDB reads to protect resources.
 */

class BunnyHydrationCache {
    constructor() {
        // High-speed localized memory container to shield Render from storage engine stress
        this.store = global.bunnyCache || new Map();
        if (!global.bunnyCache) {
            global.bunnyCache = this.store;
        }
    }

    /**
     * Stores a user configuration payload instantly into the local memory track
     * @param {String} userId - The parsed clean WhatsApp identifier key
     * @param {Object} data - Formatted configuration parameters mapping object
     */
    set(userId, data) {
        if (!userId) return false;
        const cleanId = userId.split('@')[0];
        this.store.set(cleanId, data);
        return true;
    }

    /**
     * Checks localized storage track to fetch running configurations instantly
     * @param {String} userId - The parsed clean WhatsApp identifier key
     * @returns {Object|null} Formatted user parameters map or null if empty
     */
    get(userId) {
        if (!userId) return null;
        const cleanId = userId.split('@')[0];
        return this.store.get(cleanId) || null;
    }

    /**
     * Verifies if a user configuration dataset is actively hydrated inside RAM
     * @param {String} userId - The parsed clean WhatsApp identifier key
     * @returns {Boolean} Evaluation status context output
     */
    has(userId) {
        if (!userId) return false;
        const cleanId = userId.split('@')[0];
        return this.store.has(cleanId);
    }

    /**
     * Completely purges a specific user allocation vector from memory cache space
     * @param {String} userId - The parsed clean WhatsApp identifier key
     */
    delete(userId) {
        if (!userId) return false;
        const cleanId = userId.split('@')[0];
        return this.store.delete(cleanId);
    }

    /**
     * Clears the entire volatile runtime map array to force absolute re-hydration
     */
    flushAll() {
        this.store.clear();
        return true;
    }
}

module.exports = new BunnyHydrationCache();
