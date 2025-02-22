/* ------------------------------------------------------------------------- *
 * Copyright 2002-2021, OpenNebula Project, OpenNebula Systems               *
 *                                                                           *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may   *
 * not use this file except in compliance with the License. You may obtain   *
 * a copy of the License at                                                  *
 *                                                                           *
 * http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                           *
 * Unless required by applicable law or agreed to in writing, software       *
 * distributed under the License is distributed on an "AS IS" BASIS,         *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 * See the License for the specific language governing permissions and       *
 * limitations under the License.                                            *
 * ------------------------------------------------------------------------- */
import DOMPurify from 'dompurify'

/**
 * Simulate a delay in a function.
 *
 * @param {number} ms - Delay in milliseconds
 * @returns {Promise} Promise resolved with a delay
 */
export const fakeDelay = ms => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Determines if url is external.
 *
 * @param {string} url - URL
 * @returns {boolean} `true` if url is external
 */
export const isExternalURL = url => RegExp(/^(http|https):/g).test(url)

/**
 * Generates a random key.
 *
 * @returns {string} Random key
 */
export const generateKey = () =>
  String(new Date().getTime() + Math.random()).replace('.', '')

/**
 * Sanitizes HTML and prevents XSS attacks.
 *
 * @param {string} text - Text
 * @param {...string} values - Rest of text
 * @returns {string} Clean and secure string
 */
export function sanitize (text, ...values) {
  const dirty = text.reduce((prev, next, i) =>
    `${prev}${next}${values[i] || ''}`, '')

  return DOMPurify.sanitize(dirty)
}

/**
 * Converts a long string of units into a readable format e.g KB, MB, GB, TB, YB.
 *
 * @param {number} value - The quantity of units.
 * @param {string} unit - The unit of value.
 * @param {number} fractionDigits
 * - Number of digits after the decimal point. Must be in the range 0 - 20, inclusive
 * @returns {string} Returns an string displaying sizes for humans.
 */
export const prettyBytes = (value, unit = 'KB', fractionDigits = 0) => {
  const UNITS = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  if (Math.abs(value) === 0) return `${value} ${UNITS[0]}`

  let idxUnit = UNITS.indexOf(unit)

  while (value > 1024) {
    value /= 1024
    idxUnit += 1
  }

  return `${value.toFixed(fractionDigits)} ${UNITS[idxUnit]}`
}

/**
 * Add opacity value to a HEX color.
 *
 * @param {string} color - HEX color
 * @param {number} opacity - Opacity range: 0 to 1
 * @returns {string} The color with opacity
 */
export const addOpacityToColor = (color, opacity) => {
  const opacityHex = Math.round(opacity * 255).toString(16)
  return `${color}${opacityHex}`
}

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} word - Word
 * @returns {string} The word capitalized
 */
export const capitalize = ([firstLetter, ...restOfWord]) =>
  firstLetter.toUpperCase() + restOfWord.join('')

/**
 * Converts an string to camel case.
 *
 * @param {string} s - String
 * @example permissions_panel => permissionsPanel
 * @returns {string} String with camel case format
 */
export const stringToCamelCase = s => s.replace(
  /([-_\s][a-z])/ig,
  $1 => $1.toUpperCase().replace(/[-_\s]/g, '')
)

/**
 * Converts an string in camel case to camel space.
 *
 * @param {string} s - String
 * @example permissionsPanel => 'permissions panel'
 * @returns {string} String with camel space format
 */
export const stringToCamelSpace = s => s.replace(/([a-z])([A-Z])/g, '$1 $2')

/**
 * Returns the validation by name from the form schema.
 *
 * @param {Array} fields - Field schemas
 * @returns {object} List of validations
 */
export const getValidationFromFields = fields =>
  fields.reduce(
    (schema, field) => ({
      ...schema,
      [field?.name]: field?.validation
    }),
    {}
  )

/**
 * Filter an object list by property.
 *
 * @param {Array} arr - Object list
 * @param {string} predicate - Property
 * @returns {Array} List filtered by predicate
 */
export const filterBy = (arr, predicate) => {
  const callback =
    typeof predicate === 'function' ? predicate : output => output[predicate]

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : callback(item)

        map.has(key) || map.set(key, item)

        return map
      }, new Map())
      .values()
  ]
}

/**
 * Get the value from an object by the path of property.
 *
 * @param {object} obj - Object
 * @param {string} path - Path of property
 * @param {*} [defaultValue] - Default value of property
 * @returns {*} Value of property
 */
export const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

/**
 * Set a value of property in object by his path.
 *
 * @param {object} obj - Object
 * @param {string} path - Path of property
 * @param {*} value - New value of property
 * @returns {object} Object with the new property
 */
export const set = (obj, path, value) => {
  if (Object(obj) !== obj) return obj // When obj is not an object

  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []

  const result = path.slice(0, -1).reduce((res, key, idx) => {
    if (Object(res[key]) === res[key]) return res[key]

    // If the next key is array-index,
    // then assign a new array object or new object
    res[key] = Math.abs(path[idx + 1]) >> 0 === +path[idx + 1] ? [] : {}

    return res[key]
  }, obj)

  // Assign the value to the last key
  result[path[path.length - 1]] = value

  return result
}

/**
 * Group a list of objects by a key.
 *
 * @param {object[]} list - List
 * @param {string} key - Property
 * @returns {object} Objects group by the property
 */
export const groupBy = (list, key) =>
  list.reduce((objectsByKeyValue, obj) => {
    const keyValue = get(obj, key)
    const newValue = (objectsByKeyValue[keyValue] || []).concat(obj)

    set(objectsByKeyValue, keyValue, newValue)

    return objectsByKeyValue
  }, {})

/**
 * Clone an object.
 *
 * @param {object} obj - Object
 * @returns {object} Object cloned
 */
export const cloneObject = obj => JSON.parse(JSON.stringify(obj))

/**
 * Check if value is in base64.
 *
 * @param {string} stringToValidate - String to check
 * @param {object} options - Options
 * @param {boolean} options.exact - Only match and exact string
 * @returns {boolean} Returns `true` if string is a base64
 */
export const isBase64 = (stringToValidate, options = {}) => {
  if (stringToValidate === '') return false

  const { exact = true } = options

  const BASE64_REG = /(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)/g
  const EXACT_BASE64_REG = /(?:^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$)/

  const regex = exact ? EXACT_BASE64_REG : BASE64_REG

  return regex.test(stringToValidate)
}
