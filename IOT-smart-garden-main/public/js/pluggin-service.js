import CONSTANTS from "./constants.js";
import FirebaseSerive from "./firebase-service.js"

const firebaseService = new FirebaseSerive();
export const Pluggin = {
    run: async () => {
        await firebaseService.observableAuthChanged();
    }
};
Pluggin.run();