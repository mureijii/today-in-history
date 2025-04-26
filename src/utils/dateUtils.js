/**
 * Formats a date object into the MM-DD string format used for data lookup
 * @param {Date} date - The date to format
 * @returns {string} Date string in MM-DD format
 */
export const formatDateKey = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${month}-${day}`
}

/**
 * Gets today's date
 * @returns {Date} Today's date
 */
export const getToday = () => {
  return new Date()
}

/**
 * Formats a date for display
 * @param {Date} date - The date to format
 * @returns {string} Formatted date (Month Day, Year)
 */
export const formatDateForDisplay = (date) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}