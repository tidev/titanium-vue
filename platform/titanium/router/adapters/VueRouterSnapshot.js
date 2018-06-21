export class VueRouterSnapshot {
    constructor(historyStack) {
        this.historyStack = historyStack;
    }

    isEqual(other) {
        if (this.historyStack.length !== other.historyStack.length) {
            return false;
        }

        for (let i = 0; i < this.historyStack.length; i++) {
            const state = this.historyStack[i];
            const otherState = other.historyStack[i];

            if (state.fullPath !== otherState.fullPath) {
                return false;
            }
        }

        return true;
    }
}