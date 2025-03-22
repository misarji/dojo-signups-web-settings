// Does a shallow merge of two objects where only the properties
// in source will be updated. Properties in the update object which
// are not in the source object will be ignored.
export default function updateObject(source, update) {
  const newSource = { ...source }

  Object.keys(newSource).forEach((property) => {
    if (typeof update[property] !== 'undefined') {
      //eslint-disable-next-line no-param-reassign
      newSource[property] = update[property]
    }
  })

  return newSource
}
