import { cloneDeep } from 'lodash'
import defaultInputs from './defaults/input'

const allowedTypes = ['text', 'dropdown', 'date']
class Input {
  constructor(input, onUpdate = () => {}) {
    if (typeof input === 'string') {
      // String input is the template name of input to create
      if (!Object.keys(defaultInputs).includes(input)) {
        throw new Error('The input template doesn\'t exist')
      }
      this.input = cloneDeep(defaultInputs[input])
    } else {
      this.input = input
    }
    this.onUpdate = onUpdate
  }

  get isInstance() { return true } // eslint-disable-line class-methods-use-this

  get type() { return this.input.type }

  get isTemplate() { return this.input.isTemplate }

  get label() { return this.input.label }

  get placeholder() { return this.input.placeholder }

  get isRequired() { return this.input.isRequired }

  get dropdownOptions() { return this.input.dropdownOptions }

  get espValue() { return this.input.espValue }

  set type(newType) {
    if (!allowedTypes.includes(newType)) {
      throw new Error('Input type not valid')
    }
    this.input.type = newType
    this.onUpdate()
  }

  set label(newLabel) {
    if (this.isTemplate) {
      throw new Error('Cannot change the label of a template field')
    }
    this.input.label = newLabel
    this.onUpdate()
  }

  set placeholder(newPlaceHolder) {
    this.input.placeholder = newPlaceHolder
    this.onUpdate()
  }

  set isRequired(newIsRequired) {
    this.input.isRequired = !!newIsRequired
    this.onUpdate()
  }

  set dropdownOptions(newDropdownOptions) {
    if (!Array.isArray(newDropdownOptions)) {
      throw new Error('input dropdown options must be an array')
    }
    if (newDropdownOptions.find(option => typeof option !== 'string')) {
      throw new Error('Dropdown options must be strings')
    }

    this.input.dropdownOptions = newDropdownOptions
    this.onUpdate()
  }

  set espValue(newEspValue) {
    if (typeof newEspValue !== 'string' && newEspValue !== null) {
      throw new Error('ESP value must be a string')
    }
    this.input.espValue = newEspValue
    this.onUpdate()
  }

  getSaveObj() {
    return this.input
  }
}

export default Input
