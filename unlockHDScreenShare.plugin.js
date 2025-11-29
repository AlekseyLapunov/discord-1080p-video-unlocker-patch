/**
 * @name unlockHDScreenShare
 * @version 0.0.2p
 * @description unlock the ability to share your screen in 1080p
 * @author Ralkey#0516, AlekseyLapunov
 * @source https://github.com/AlekseyLapunov/discord-1080p-video-unlocker-patch
 *   
 */

module.exports = class unlockHDScreenShare {
    
    constructor() {
        this.userPremiumType = null;
        this.UserStore = BdApi.Webpack.getModule(m => m.getCurrentUser);
    }
     
    start() {
        if (!this.UserStore) {
            BdApi.UI.showToast("Could not find User Store. Plugin cannot be loaded", { type: "error" });
            return;
        }

        const currentUser = this.UserStore.getCurrentUser();
        if (currentUser) {
            this.userPremiumType = currentUser.premiumType;
            currentUser.premiumType = 2;
        } else {
            BdApi.UI.showToast("Could not find Current User. Plugin cannot be loaded.", { type: "error" });
        }
    }
    
    stop() {
        if (this.UserStore && this.userPremiumType !== null) {
            const currentUser = this.UserStore.getCurrentUser();
            if (currentUser) {
                currentUser.premiumType = this.userPremiumType;
            }
        }
    }
}
