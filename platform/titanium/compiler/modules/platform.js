import { getAndRemoveAttr } from 'compiler/helpers';

/**
 * Extracts the v-platform directive from a node and sets a flag on the node
 * to not render any template code if the platform does not matches the current
 * platform
 *
 * @param {Object} el ASTElement from the parser
 * @param {Object} options
 */
function preTransformNode(el, options) {
	let platformName = getAndRemoveAttr(el, 'v-platform');
	if (platformName) {
		// We need to get this from the build target if we start to pre-compile templates
		// instead of compiling them during runtime.
		let currentPlatformName = Ti.Platform.osname;
		el.shouldNotRender = platformName !== currentPlatformName;
	}
}

/**
 * Removes all template code related to a node if the shouldNotRender flag is set
 *
 * @param {Object} el ASTElement from the code generator
 * @param {string} code Existing code for the node
 * @return {string} The untouched code if the node should be rendered, empty string if not
 */
function transformCode(el, code) {
	return el.shouldNotRender ? '' : code;
}

export default {
	preTransformNode,
	transformCode
};
