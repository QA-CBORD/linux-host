/**
 * Creates a new array with all sub-array elements concatenated into it
 * recursively up to the specified depth.
 *
 * @param values {*} - the array to transform/flat
 * @param depth {number} - the depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
 *
 * @returns {Array<*>} A new array with the sub-array elements concatenated into it.
 */
 export function flat(values: object[][] | object[], depth = 1) {
    return depth > 0
        ? values.reduce((acc, val) => acc.concat(Array.isArray(val) ? flat(val, depth - 1) : val), [])
        : values.slice();
  }
