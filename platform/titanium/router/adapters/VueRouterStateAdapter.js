import { AbstractRouterStateAdapter } from 'titanium-navigator';
import { VueRouterSnapshot } from './VueRouterSnapshot';

/**
 * Adapter to snapshot and restore the router state in Vue.js
 */
export class VueRouterStateAdapter extends AbstractRouterStateAdapter {
	constructor(history) {
		super();

		this.history = history;
		this.initialSnapshot = this.createSnapshot();
	}

	restoreStateFromSnapshot(snapshot) {
		this.history.stack = snapshot.historyStack;
	}

	createSnapshot() {
		return new VueRouterSnapshot([ ...this.history.stack ]);
	}
}
