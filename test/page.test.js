import { assert } from 'chai'
import faker from 'faker'
import Page from '../lib/Page'
import Settings from '../lib/Settings'

const mockSettings = () => ({
  getOnUpdate: () => () => {},
  viewMode: 'desktop',
})

const getNewPage = (pageSettings, settings = mockSettings()) => new Page(pageSettings, settings)

describe('Page', () => {
  describe('Update old settings with new features', () => {
    it('should add isViewable to secondary button', () => {
      const settings = new Settings()
      const settingsWithoutButtonIsViewable = settings.getSaveObj()
      delete settingsWithoutButtonIsViewable.pages[0].secondaryButton.desktop.isViewable
      assert.isUndefined(settingsWithoutButtonIsViewable.pages[0].secondaryButton.desktop.isViewable)
      const newSettings = new Settings(settingsWithoutButtonIsViewable)
      assert.equal(newSettings.pages[0].secondaryButton.isViewable, true)
    })
  })
  describe('title', () => {
    it('Should get title', () => {
      const page = getNewPage()
      assert.include(page.title.content, 'YOUR TITLE HERE')
      assert.equal(page.title.isViewable, true)
    })
    it('Should set title', () => {
      const page = getNewPage()
      const newTitle = {
        content: faker.lorem.words(5),
        isViewable: false,
      }
      page.title = newTitle
      assert.equal(page.title.content, newTitle.content)
      assert.equal(page.title.isViewable, newTitle.isViewable)
    })
    it('should set title on mobile', () => {
      const settings = new Settings()
      const page = settings.addPage()
      const desktopTitle = {
        content: faker.lorem.words(5),
        isViewable: false,
      }
      const mobileTitle = {
        content: faker.lorem.words(5),
        isViewable: true,
      }
      page.title = desktopTitle
      settings.viewMode = 'mobile'
      page.title = mobileTitle

      settings.viewMode = 'desktop'
      assert.deepEqual(page.title, desktopTitle)
      settings.viewMode = 'mobile'
      assert.deepEqual(page.title, mobileTitle)
    })
  })
  describe('subtitle', () => {
    it('Should get subtitle', () => {
      const page = getNewPage()
      assert.include(page.subtitle.content, 'Your subtitle here')
      assert.equal(page.subtitle.isViewable, true)
    })
    it('Should set subtitle', () => {
      const page = getNewPage()
      const newTitle = {
        content: faker.lorem.words(5),
        isViewable: false,
      }
      page.subtitle = newTitle
      assert.equal(page.subtitle.content, newTitle.content)
      assert.equal(page.subtitle.isViewable, newTitle.isViewable)
    })
  })
  describe('heroImage', () => {
    it('should get hero image', () => {
      const page = getNewPage()
      assert.deepEqual(page.heroImage, {
        fileName: null,
        url: null,
      })
    })
    it('should set hero image', () => {
      const page = getNewPage()
      const heroImage = {
        url: faker.image.imageUrl(),
        fileName: `${faker.hacker.noun()}.jpg`,
      }
      page.heroImage = heroImage
      assert.deepEqual(page.heroImage, heroImage)
    })
  })
  describe('inputs', () => {
    it('should get inputs', () => {
      const page = getNewPage()
      assert.deepEqual(page.inputs, [])
    })
    it('should add inputs', () => {
      const settings = new Settings()
      const page = settings.addPage()
      page.addInput('firstName')
      assert.equal(page.inputs.length, 1)
      page.addInput('lastName')
      assert.equal(page.inputs.length, 2)
    })
    it('should delete input', () => {
      const settings = new Settings()
      const page = settings.addPage()
      const input = page.addInput('firstName')
      assert.equal(page.inputs.length, 1)
      page.removeInput(input)
      assert.equal(page.inputs.length, 0)

      const input1 = page.addInput('firstName')
      page.addInput('lastName')
      assert.equal(page.inputs.length, 2)
      page.removeInput(input1)
      assert.equal(page.inputs.length, 1)
    })
    it('should move input', () => {
      const settings = new Settings()
      const page1 = settings.addPage()
      const page2 = settings.addPage()
      const input = page1.addInput('firstName')
      assert.equal(page1.inputs.length, 1)
      assert.equal(page2.inputs.length, 0)
      page2.addInput(input)
      assert.equal(page1.inputs.length, 0)
      assert.equal(page2.inputs.length, 1)
    })
  })
  describe('getSaveObj', () => {
    it('should get the save JSON', () => {
      const page = getNewPage()
      const titleContent = faker.hacker.noun()
      const subtitleContent = faker.hacker.noun()
      page.title = { content: titleContent }
      page.subtitle = { content: subtitleContent }
      const saveObj = page.getSaveObj()
      assert.equal(saveObj.title.desktop.content, titleContent)
      assert.equal(saveObj.subtitle.desktop.content, subtitleContent)
    })
  })
  describe('primaryButton', () => {
    it('should set and get content', () => {
      const settings = new Settings()
      const page = settings.addPage()
      assert.exists(page.primaryButton.content)
      const primaryButtonContent = faker.lorem.words(5)
      page.primaryButton = { content: primaryButtonContent }
      assert.equal(page.primaryButton.content, primaryButtonContent)
    })
  })
  describe('secondaryButton', () => {
    it('should set and get content', () => {
      const settings = new Settings()
      const page = settings.addPage()
      assert.exists(page.secondaryButton.content)
      const secondaryButtonContent = faker.lorem.words(5)
      page.secondaryButton = { content: secondaryButtonContent }
      assert.equal(page.secondaryButton.content, secondaryButtonContent)
    })
    it('should set and get view state', () => {
      const settings = new Settings()
      const page = settings.addPage()
      assert.isTrue(page.secondaryButton.isViewable)
      page.secondaryButton = { isViewable: false }
      assert.isFalse(page.secondaryButton.isViewable)
    })
  })
})
