import { cloneDeep, get } from 'lodash'
import Page from './Page'
import updateObject from './utils/updateObject'
import addNewDefaultProperty from './utils/addNewDefaultProperty'
import defaultSettings from './defaults/settings.json'
import Input from './Input'

import { schemaDefinitions } from './utils/validations'

const allowedViewModes = ['desktop', 'mobile']
const defaultViewMode = 'desktop'

const validateSetterValue = (method, value) => {
  const schemaDetail = get(schemaDefinitions, method)
  if (!schemaDetail) throw new Error('Invalid value')
  const valid = schemaDetail.validate(value)
  if (valid.error) throw new Error(valid.error)
}

// add new features to old settings
const addNewFeatures = settings => {
  if (!settings.fields) {
    settings.fields = cloneDeep(defaultSettings.fields)
  }
  addNewDefaultProperty(settings.buttons.primary, 'borderRadius', 4)
  addNewDefaultProperty(settings.buttons.secondary, 'borderRadius', 4)
  if (settings.type === undefined) settings.type = 'popup'
  if (settings.autoCloseDelay === undefined) settings.autoCloseDelay = null
  if (settings.trigger.displayFrequency === undefined) settings.trigger.displayFrequency = 'never'
  if (settings.trigger.displayFrequencyDelay === undefined) settings.trigger.displayFrequencyDelay = 30
  // add versioning and update version
}

class Settings {
  constructor(settings = null, onUpdate = () => {}, formType = 'popup') {
    [this.currentViewMode] = allowedViewModes
    this.onUpdate = onUpdate
    if (settings) addNewFeatures(settings)
    this.settings = settings || cloneDeep(defaultSettings)
    this.settingsPages = this.settings.pages.map((pageData) => new Page(pageData, this))

    // if new settings are being created then add defaults
    if (!settings) {
      this.settings.type = formType
      const thankYouPage = this.addPage() // last page (Thank you page)
      thankYouPage.title = {
        content: '<p class="ql-align-center"><strong style="font-size: 18px;" class="ql-font-Montserrat">Thank you for signing up</strong></p>',
      }
      thankYouPage.subtitle = {
        content: '<p class="ql-align-center"><span class="ql-font-Montserrat" style="font-size: 14px;">Check your messages for a special offer from us!</span></p>',
      }
      thankYouPage.primaryButton = {
        content: '<p class="ql-align-center"><span style="color: rgb(255, 255, 255); font-size: 14px;" class="ql-font-Montserrat">Done</span></p>',
      }
      thankYouPage.secondaryButton = { isViewable: false }

      const firstPage = this.addPage()
      firstPage.addInput('email')

      // TODO: in future, consider refactoring to subclasses with new form types to avoid
      // manually logic like below

      // Embed has two pages: (1) Email and Phone inputs and (2) Thank you page
      if (formType === 'embed') {
        firstPage.addInput('phone')
        firstPage.secondaryButton = { isViewable: false }
        thankYouPage.primaryButton = { isViewable: false }
      }

      // Pop-Up has three pages: (1) Email input, (2) Phone input, and (3) Thank you page
      if (formType === 'popup') {
        const secondPage = this.addPage()
        secondPage.addInput('phone')
      }
    }
  }

  getInput(templateName) {
    return new Input(templateName, this.onUpdate)
  }

  get viewMode() {
    return this.currentViewMode
  }

  getOnUpdate() {
    return this.onUpdate
  }

  set viewMode(newViewMode) {
    if (!allowedViewModes.includes(newViewMode)) {
      throw new Error('View mode not supported')
    }
    this.currentViewMode = newViewMode
    this.onUpdate()
  }

  get id() {
    return this.settings.id
  }

  get type() { return this.settings.type }

  set type(newType) {
    validateSetterValue('type', newType)
    this.settings.type = newType
    this.onUpdate()
   }

  get name() { return this.settings.name }

  set name(newName) {
    this.settings.name = newName
    this.onUpdate()
  }

  get status() {
    return this.settings.status
  }

  set status(newStatus) {
    validateSetterValue('status', newStatus)
    this.settings.status = newStatus
    this.onUpdate()
  }

  get brandId() {
    return this.settings.brandId
  }

  set brandId(newBrandId) {
    validateSetterValue('brandId', newBrandId)
    this.settings.brandId = newBrandId
    this.onUpdate()
  }

  get brandName() {
    return this.settings.brandName
  }

  set brandName(newBrandName) {
    validateSetterValue('brandName', newBrandName)
    this.settings.brandName = newBrandName
    this.onUpdate()
  }

  get termsUrl() {
    return this.settings.termsUrl
  }

  set termsUrl(newTermsUrl) {
    validateSetterValue('termsUrl', newTermsUrl)
    this.settings.termsUrl = newTermsUrl
  }

  get privacyUrl() {
    return this.settings.privacyUrl
  }

  set privacyUrl(newPrivacyUrl) {
    validateSetterValue('privacyUrl', newPrivacyUrl)
    this.settings.privacyUrl = newPrivacyUrl
  }

  get domain() {
    return this.settings.domain
  }

  set domain(newDomain) {
    validateSetterValue('domain', newDomain)
    this.settings.domain = newDomain
    this.onUpdate()
  }

  get launchedAt() {
    return this.settings.launchedAt
  }

  get createdAt() {
    return this.settings.createdAt
  }

  get espSettings() {
    return this.settings.esp
  }

  get smsCampaignId() {
    return this.settings.smsCampaignId
  }

  set smsCampaignId(newSmsCampaignId) {
    validateSetterValue('smsCampaignId', newSmsCampaignId)
    this.settings.smsCampaignId = newSmsCampaignId
    this.onUpdate()
  }

  set espSettings(newEspSettings) {
    const updatedEspSettings = updateObject(this.settings.esp, newEspSettings)
    validateSetterValue('esp', updatedEspSettings)
    this.settings.esp = updatedEspSettings
    this.onUpdate()
  }

  get autoCloseDelay() {
    return this.settings.autoCloseDelay
  }

  set autoCloseDelay(autoCloseDelay) {
    validateSetterValue('autoCloseDelay', autoCloseDelay)
    this.settings.autoCloseDelay = autoCloseDelay
    this.onUpdate()
  }

  get trigger() {
    return this.settings.trigger
  }

  set trigger(newTrigger) {
    const updatedTrigger = updateObject(this.settings.trigger, newTrigger)
    validateSetterValue('trigger', updatedTrigger)
    this.settings.trigger = updatedTrigger
    this.onUpdate()
  }

  get heroImage() {
    return this.settings.heroImage
  }

  set heroImage(newHeroImage) {
    const updatedHeroImg = updateObject(this.heroImage, newHeroImage)
    validateSetterValue('heroImage', updatedHeroImg)
    this.settings.heroImage = updatedHeroImg
    this.onUpdate()
  }

  get brandLogo() {
    return this.settings.brandLogo[this.viewMode] || this.settings.brandLogo[defaultViewMode]
  }

  set brandLogo(newBrandLogo) {
    const { brandLogo } = this
    const updatedBrandLogo = updateObject(brandLogo, newBrandLogo)
    validateSetterValue(`brandLogo.${this.viewMode}`, updatedBrandLogo)
    this.settings.brandLogo[this.viewMode] = updatedBrandLogo
    this.onUpdate()
  }

  get primaryButton() {
    const primaryButton = this.settings.buttons.primary
    return primaryButton[this.viewMode] || primaryButton[defaultViewMode]
  }

  set primaryButton(newPrimaryButton) {
    const { primaryButton } = this
    const newButtonSettings = updateObject(primaryButton, newPrimaryButton)
    validateSetterValue(`buttons.primary.${this.viewMode}`, newButtonSettings)
    this.settings.buttons.primary[this.viewMode] = newButtonSettings
    this.onUpdate()
  }

  get secondaryButton() {
    const secondaryButton = this.settings.buttons.secondary
    return secondaryButton[this.viewMode] || secondaryButton[defaultViewMode]
  }

  set secondaryButton(newSecondaryButton) {
    const { secondaryButton } = this
    const newButtonSettings = updateObject(secondaryButton, newSecondaryButton)
    validateSetterValue(`buttons.secondary.${this.viewMode}`, newButtonSettings)
    this.settings.buttons.secondary[this.viewMode] = newButtonSettings
    this.onUpdate()
  }

  get fields() {
    const fields = this.settings.fields
    return fields[this.viewMode] || fields[defaultViewMode]
  }

  set fields(newFields) {
    const { fields } = this
    const updatedFields = updateObject(fields, newFields)
    validateSetterValue(`fields.${this.viewMode}`, updatedFields)
    this.settings.fields[this.viewMode] = updatedFields
    this.onUpdate()
  }

  get themeColors() {
    return Object.keys(this.settings.themeColors).reduce(
      (all, colorType) => ({
        ...all,
        [colorType]:
          this.settings.themeColors[colorType][this.viewMode] ||
          this.settings.themeColors[colorType][defaultViewMode],
      }),
      {}
    )
  }

  set themeColors(newThemeColors) {
    if (typeof newThemeColors !== 'object') {
      throw new Error('theme colors must be an Object')
    }
    Object.keys(this.settings.themeColors).forEach((element) => {
      if (newThemeColors[element]) {
        validateSetterValue(`themeColors.${element}.${this.viewMode}`, newThemeColors[element])
        this.settings.themeColors[element][this.viewMode] = newThemeColors[element]
      }
    })
    this.onUpdate()
  }

  // searches all pages to delete an input
  removeInput(input) {
    this.settingsPages.forEach((page) => page.removeInput(input))
    this.onUpdate()
  }

  // exports json obj
  // only to be used for saving
  getSaveObj() {
    return {
      ...this.settings,
      pages: this.settingsPages.map((page) => page.getSaveObj()),
    }
  }

  // ----- page methods ------
  addPage() {
    const newPage = new Page(null, this)
    const formType = this.settings.type
    if (formType === 'embed') newPage.secondaryButton = { isViewable: false }
    this.settingsPages.splice(this.settingsPages.length - 1, 0, newPage)
    this.onUpdate()
    return newPage
  }

  removePage(page) {
    const pageIndex = this.settingsPages.findIndex((currentPage) => currentPage === page)
    if (pageIndex === this.settingsPages.length - 1) {
      throw new Error('Cannot delete the last page')
    }
    if (!page.isDeletable()) {
      throw new Error('Cannot delete this page')
    }
    this.settingsPages.splice(pageIndex, 1)
    this.onUpdate()
  }

  get pages() {
    return this.settingsPages
  }
}

export default Settings
