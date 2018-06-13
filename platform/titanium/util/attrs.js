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
    return false;
}