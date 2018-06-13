import { makeMap } from 'shared/util';

/**
 * Checks of a tag is reserved and should not be used as a component name
 *
 * @type {Boolean}
 */
export const isReservedTag = makeMap('template', true);

/**
 * Returns the namespace of a tag
 * 
 * Namespaced tags are currently not support so we always return an empty
 * string.
 *
 * @param {String} tag Tag to get the namespace for
 * @return {String}
 */
export function getTagNamespace(tag) {
    return '';
}