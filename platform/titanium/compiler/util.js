/**
 * Checks if a tag is unary, i.e. has no content.
 * 
 * Always returns false since we don't have any unary tags.
 *
 * @param {String} tag Tag to check
 * @return {Boolean}
 */
export function isUnaryTag(tag) {
    return false;
}

/**
 * Checks if a tag is self closing and therefore can intentionally be left open.
 * 
 * Returns false since we force all tags to be closed.
 *
 * @param {String} tag The tag to check
 * @return {Boolean} True if the tag can be left open, false if not
 */
export function canBeLeftOpenTag(tag) {
    return false;
}