/**
 * Convert seconds to millseconds.
 *
 * @param {number} seconds Seconds to convert.
 *
 * @returns {number} Milliseconds.
 */
export const secToMillisec = (seconds) => seconds * 1000;

/**
 * Convert minutes to seconds.
 *
 * @param {number} minutes Minutes to convert.
 *
 * @returns {number} Seconds.
 */
export const minToSeconds = (minutes) => minutes * 60;

/**
 * Convert minutes to milliseconds.
 *
 * @param {number} minutes Minutes to convert.
 *
 * @returns {number} Milliseconds.
 */
export const minToMillisec = (minutes) => minutes * 60 * 1000;

/**
 * Convert hours to seconds.
 *
 * @param {number} hours Seconds to convert.
 *
 * @returns {number} Seconds.
 */
export const hourToSeconds = (hours) => hours * 3600;
