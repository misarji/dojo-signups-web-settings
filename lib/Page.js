import { cloneDeep } from 'lodash'
import Input from './Input'
import updateObject from './utils/updateObject'
import addNewDefaultProperty from './utils/addNewDefaultProperty'
import defaultPage from './defaults/page.json'

const defaultViewMode = 'desktop'

const addNewFeatures = page => {
  addNewDefaultProperty(page.secondaryButton, 'isViewable', true)
  addNewDefaultProperty(page.primaryButton, 'isViewable', true)
}

class Page {
  constructor(page = null, settings) {
    if (page) addNewFeatures(page)
    this.page = page || cloneDeep(defaultPage)
    this.settings = settings
    this.onUpdate = settings.getOnUpdate()
    this.pageInputs = this.page.inputs.map(input => new Input(input, this.onUpdate))
  }

  getOnUpdate() { return this.onUpdate }

  get viewMode() { return this.settings.viewMode }

  get title() {
    return this.page.title[this.viewMode] || this.page.title[defaultViewMode]
  }

  get subtitle() {
    return this.page.subtitle[this.viewMode] || this.page.subtitle[defaultViewMode]
  }

  get heroImage() { return this.page.heroImage }

  get inputs() {
    return this.pageInputs
  }

  get primaryButton() {
    return this.page.primaryButton[this.viewMode] || this.page.primaryButton[defaultViewMode]
  }

  get secondaryButton() {
    return this.page.secondaryButton[this.viewMode] || this.page.secondaryButton[defaultViewMode]
  }

  set title(newTitle) {
    const { title } = this
    this.page.title[this.viewMode] = updateObject(title, newTitle)
    this.onUpdate()
  }

  set subtitle(newSubtitle) {
    const { subtitle } = this
    this.page.subtitle[this.viewMode] = updateObject(subtitle, newSubtitle)
    this.onUpdate()
  }

  set heroImage(newHeroImage) {
    this.page.heroImage = updateObject(this.page.heroImage, newHeroImage)
    this.onUpdate()
  }

  set primaryButton(newPrimaryButton) {
    const { primaryButton } = this
    this.page.primaryButton[this.viewMode] = updateObject(primaryButton, newPrimaryButton)
    this.onUpdate()
  }

  set secondaryButton(newSecondaryButton) {
    const { secondaryButton } = this
    this.page.secondaryButton[this.viewMode] = updateObject(secondaryButton, newSecondaryButton)
    this.onUpdate()
  }

  /**
   * @param Integer index position of the input to be placed
  */
  addInput(inputData, index = 9999) {
    const newInput = inputData.isInstance
      ? inputData
      : this.settings.getInput(inputData)
    this.settings.removeInput(newInput)
    this.pageInputs.splice(index, 0, newInput)
    this.onUpdate()
    return newInput
  }

  removeInput(input) {
    // inputs are the same if it's the same custom input
    // or a template input with the same label
    this.pageInputs = this.pageInputs.filter(currentInput => currentInput !== input)
    this.onUpdate()
  }

  getSaveObj() {
    return {
      ...this.page,
      inputs: this.pageInputs.map(input => input.getSaveObj()),
    }
  }

  isDeletable() {
    return true
  }
}

export default Page
