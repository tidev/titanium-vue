import {makeMap} from 'shared/util';
import {isTitaniumView, getViewMeta} from '../element-registry';

/**
 * Checks of a tag is reserved and should not be used as a component name
 *
 * @type {Boolean}
 */
export const isReservedTag = makeMap('template', true);

/**
 * Checks if a tag is self closing and therefore can intentionally be left open
 *
 * @param {String} tag The tag to check
 * @return {Boolean} True if the tag can be left open, false if not
 */
export function canBeLeftOpenTag(tag) {
	if (isTitaniumView(tag)) {
		return getViewMeta(tag).canBeLeftOpenTag;
	}
	return false;
}

/**
 * Returns true for attributes that must use props for binding
 *
 * @TODO evaluate which tags can be added here
 *
 * @param {String} tag Name of the tag the attribute was found on
 * @param {String} type Type of the tag (as in input tags, should be irrelevant for us)
 * @param {String} attributeName Attribute name
 * @return {Boolean} True if the attribute should use props for binding, false if not
 */
export function mustUseProp(tag, type, attributeName) {
	console.log(`mustUseProps(${tag}, ${type}, ${attributeName})`);
	return false;
}

/**
 * Returns the namespace of a tag
 *
 * Currently unused, maybe interesting for platform specific tags?
 *
 * @param {String} tag Tag to get the namespace for
 * @return {String}
 */
export function getTagNamespace(tag) {
	if (isTitaniumView(tag)) {
		return getViewMeta(tag).tagNamespace;
	}
	return '';
}

/**
 * Checks if a tag is unary, i.e. has no content
 *
 * @param {String} tag Tag to check
 * @return {Boolean}
 */
export function isUnaryTag(tag) {
	if (isTitaniumView(tag)) {
		return getViewMeta(tag).isUnaryTag;
	}
	return false;
}
