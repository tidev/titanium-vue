import * as nodeOps from './node-ops';
import { createPatchFunction } from 'core/vdom/patch';
import platformModules from './modules/index';
import baseModules from 'core/vdom/modules/index';

const modules = platformModules.concat(baseModules);

/**
 * Creates a custom patch function that enables logging on various vdom node
 * operations and passes our updated modules that handle setting of attributes,
 * styles and event handlers on vdom nodes that contain a Titanium view
 */
export const patch = createPatchFunction({
	nodeOps,
	modules
});
