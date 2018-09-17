import { getAndRemoveAttr } from 'compiler/helpers';

const currentPlatformName = process.env.TARGET_PLATFORM;
const platformAttributePattern = /:?(\w+):[\w-]+/;

/**
 * Applies pre-transformations for the platform directive and platform scoped
 * attributes.
 *
 * Extracts the v-platform directive from a node and sets a flag on the node
 * to not render the node if the platform does not matches the current
 * platform. The node will then be removed in the postTransformNode below.
 *
 * Also inspects a node's attribute list and removes any attributes with a
 * platform scope that does not match the current platform.
 *
 * @param {Object} el ASTElement from the parser
 * @param {Object} options Compiler options
 */
function preTransformNode(el, options) {
	let platformName = getAndRemoveAttr(el, 'v-platform');
	if (platformName) {
		el.shouldNotRender = platformName !== currentPlatformName;
	}
	el.attrsList = el.attrsList.filter(attribute => {
		const match = attribute.name.match(platformAttributePattern);
		if (match) {
			const attributePlatformName = match[1];
			return attributePlatformName === currentPlatformName;
		}

		return true;
	});
}

/**
 * Removes all nodes that are marked with the shouldNotRender flag so they
 * will not be processed during code generation.
 *
 * @param {Object} el ASTElement from the parser
 * @param {Object} options Compiler options
 */
function postTransformNode(el, options) {
	if (el.shouldNotRender) {
		const childIndex = el.parent.children.indexOf(el);
		el.parent.children.splice(childIndex, 1);
	}
}

export default {
	preTransformNode,
	postTransformNode
};
