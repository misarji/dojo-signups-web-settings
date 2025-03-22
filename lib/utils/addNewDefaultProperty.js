/**
 * Adds a default property if it doesn't already exists.
 * Used to easily add new properties to old settings
 * obj: { desktop: {}, mobile: null }
 * Will add the property to desktop and only add to
 * mobile if mobile is set.
 */
export default (obj, property, defaultValue) => {
  if (typeof obj.desktop[property] === 'undefined') {
    obj.desktop[property] = defaultValue
  }
  if (obj.mobile === null) return
  if (typeof obj.mobile[property] === 'undefined') {
    obj.mobile[property] = defaultValue
  }
}
