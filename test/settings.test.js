import { assert } from 'chai'
import faker from 'faker'
import Settings from '../lib/Settings'
import Input from '../lib/Input'

const defaultPageCount = 3

describe('Settings', () => {
  describe('Update old settings with new features', () => {
    it('should add fields settings', () => {
      const settings = new Settings()
      const settingsWithoutFields = settings.getSaveObj()
      delete settingsWithoutFields.fields
      assert.isUndefined(settingsWithoutFields.fields)
      const newSettings = new Settings(settingsWithoutFields)
      assert.equal(settings.fields.borderRadius, 4)
    })
    it('should add borderRadius to buttons', () => {
      const settings = new Settings()
      const settingsWithoutButtonRadius = settings.getSaveObj()
      delete settingsWithoutButtonRadius.buttons.primary.borderRadius
      delete settingsWithoutButtonRadius.buttons.secondary.borderRadius
      assert.isUndefined(settingsWithoutButtonRadius.buttons.primary.borderRadius)
      assert.isUndefined(settingsWithoutButtonRadius.buttons.secondary.borderRadius)
      const newSettings = new Settings(settingsWithoutButtonRadius)
      assert.equal(newSettings.primaryButton.borderRadius, 4)
      assert.equal(newSettings.secondaryButton.borderRadius, 4)
    })
  })
  describe('Default settings', () => {
    it('Pop-ups should have three pages', () => {
      const settings = new Settings()
      assert.equal(settings.pages.length, 3)
    })
    it('Embeds should have two pages', () => {
      const settings = new Settings(null, () => {}, 'embed')
      assert.equal(settings.pages.length, 2)
    })
    it('For popups, only last page should not have secondaryButton', () => {
      const settings = new Settings()
      assert.isTrue(settings.pages[0].secondaryButton.isViewable)
      assert.isTrue(settings.pages[1].secondaryButton.isViewable)
      assert.isFalse(settings.pages[2].secondaryButton.isViewable)
    })
    it('For embeds, no pages should have secondaryButtons', () => {
      const settings = new Settings(null, () => {}, 'embed')
      assert.isFalse(settings.pages[0].secondaryButton.isViewable)
      assert.isFalse(settings.pages[1].secondaryButton.isViewable)
    })
  })
  describe('getInput', () => {
    it('Should return an instance of Input', () => {
      const settings = new Settings()
      assert.instanceOf(settings.getInput('phone'), Input)
      assert.instanceOf(settings.getInput('email'), Input)
      assert.instanceOf(settings.getInput('customText'), Input)
      assert.throws(() => { settings.getInput('Invalid') })
    })
    it('Should not return an invalid input', () => {
      const settings = new Settings()
      assert.throws(() => { settings.getInput('unknownInput') })
    })
    it('Should remove input', () => {
      const settings = new Settings()
      const inputLabel = faker.lorem.word()
      const customInput = settings.getInput('customText')
      customInput.label = inputLabel
      const newPage = settings.addPage()
      newPage.addInput(customInput)
      assert.equal(newPage.inputs[0].label, inputLabel, 'new input exists on page')
      settings.removeInput(customInput)
      assert.equal(newPage.inputs.length, 0, 'new custom input has been removed')
      assert.equal(settings.pages[0].inputs[0].label, 'Email', 'Default phone input is still there')
      const templateInput = settings.getInput('email')
      settings.pages[1].addInput(templateInput)
      assert.equal(settings.pages[1].inputs[1].label, 'Email', 'Email input has been added to page 1')
      settings.removeInput(templateInput)
      assert.equal(settings.pages[1].inputs.length, 1, 'Email template removed. Only phone input left')
      assert.equal(settings.pages[1].inputs[0].label, 'Phone', 'Default phone input is still there')
    })
    it('should call on update', () => {
      let onUpdateCalled = false
      const onUpdate = () => { onUpdateCalled = true }
      const settings = new Settings(null, onUpdate)
      const customDropdown = settings.getInput('customDropdown')
      onUpdateCalled = false
      customDropdown.dropdownOptions = ['1', '2', '3']
      assert.equal(onUpdateCalled, true)
      settings.pages[0].addInput(customDropdown)
      onUpdateCalled = false
      customDropdown.dropdownOptions = ['1', '2', '3']
      assert.equal(onUpdateCalled, true)
    })
  })
  describe('viewMode', () => {
    it('Should get and set view mode', () => {
      const settings = new Settings()
      assert.equal(settings.viewMode, 'desktop')
      settings.viewMode = 'mobile'
      assert.equal(settings.viewMode, 'mobile')
      assert.throws(() => { settings.viewMode = 'unknown' })
      assert.equal(settings.viewMode, 'mobile')
    })
  })
  describe('id', () => {
    it('should get the id', () => {
      const settings = new Settings()
      assert.equal(settings.id, null)
      const exportObj = settings.getSaveObj()
      const newId = faker.random.word()
      exportObj.id = newId
      const newSettings = new Settings(exportObj)
      assert.equal(newSettings.id, newId)
    })
  })
  describe('type', () => {
    it('should get and set the form type', () => {
      const settings = new Settings()
      console.log(settings)
      assert.equal(settings.type, 'popup')
      settings.type = 'embed'
      assert.equal(settings.type, 'embed')
      assert.throws(() => { settings.type = 'unknown' })
      assert.equal(settings.type, 'embed')
    })
  })
  describe('brandName', () => {
    it('should get and set the brand name', () => {
      const settings = new Settings()
      const brandName = faker.internet.userName()
      assert.isNull(settings.brandName)
      settings.brandName = brandName
      assert.equal(settings.brandName, brandName)
    })
  })
  describe('termsUrl', () => {
    it('should get and set the terms url', () => {
      const settings = new Settings()
      const termsUrl = faker.internet.userName()
      assert.isNull(settings.termsUrl)
      settings.termsUrl = termsUrl
      assert.equal(settings.termsUrl, termsUrl)
    })
  })
  describe('privacyUrl', () => {
    it('should get and set the privacy url', () => {
      const settings = new Settings()
      const privacyUrl = faker.internet.userName()
      assert.isNull(settings.privacyUrl)
      settings.privacyUrl = privacyUrl
      assert.equal(settings.privacyUrl, privacyUrl)
    })
  })
  describe('name', () => {
    it('Should get and set name', () => {
      const settings = new Settings()
      const name1 = faker.internet.userName()
      settings.name = name1
      assert.equal(settings.name, name1)
      const name2 = faker.internet.userName()
      settings.name = name2
      assert.equal(settings.name, name2)
    })
  })
  describe('status', () => {
    it('Should get and set status', () => {
      const settings = new Settings()
      assert.equal(settings.status, 'inactive')
      settings.status = 'active'
      assert.equal(settings.status, 'active')
      settings.status = 'active'
      assert.throws(() => { settings.status = 'invalid' })
    })
  })
  describe('brandId', () => {
    it('Should get and set the brand ID', () => {
      const settings = new Settings()
      const brandId = faker.datatype.number()
      settings.brandId = brandId
      assert.equal(settings.brandId, brandId)
      assert.throws(() => { settings.brandId = 'String' })
    })
  })
  describe('domain', () => {
    it('Should get and set the domain', () => {
      const settings = new Settings()
      const url = faker.internet.url()
      settings.domain = url
      assert.equal(settings.domain, url)
    })
  })
  describe('espSettings', () => {
    it('Should get and set the ESP settings', () => {
      const settings = new Settings()
      const newEspSettings1 = {
        brandIntegrationId: faker.datatype.number(),
        listId: faker.datatype.string(),
        espDojoProperty: faker.lorem.word(),
      }
      settings.espSettings = newEspSettings1
      assert.deepEqual(settings.espSettings, newEspSettings1)
      const newEspSettings2 = { brandIntegrationId: faker.datatype.number() }
      settings.espSettings = newEspSettings2
      assert.deepEqual(settings.espSettings, { ...newEspSettings1, ...newEspSettings2 })
    })
  })
  describe('smsCampaignId', () => {
    it('Should get and set the sms campaign id', () => {
      const settings = new Settings()
      assert.isNull(settings.smsCampaignId)
      const newSmsCampaignId = faker.datatype.number()
      settings.smsCampaignId = newSmsCampaignId
      assert.equal(settings.smsCampaignId, newSmsCampaignId)
    })
  })
  describe('trigger', () => {
    it('Should get and set the trigger display timing settings', () => {
      const settings = new Settings()
      const triggerImmediately = { type: 'immediately' }
      settings.trigger = triggerImmediately
      assert.equal(settings.trigger.type, 'immediately')
      const triggerOnExit = { type: 'exit' }
      settings.trigger = triggerOnExit
      assert.equal(settings.trigger.type, 'exit')
      const triggerOnDelay = {
        type: 'delay',
        delay: faker.datatype.number(),
      }
      settings.trigger = triggerOnDelay
      assert.throws(() => {
        settings.trigger = { type: 'delay', delay: faker.lorem.word() }
      })
      assert.equal(settings.trigger.type, 'delay')
      assert.equal(settings.trigger.delay, triggerOnDelay.delay)
      assert.throws(() => { settings.trigger = { type: 'invalid' } })
    })
    it('Should get and set the trigger display frequency settings', () => {
      const settings = new Settings()

      const triggerEvery = { displayFrequency: 'every-session' }
      settings.trigger = triggerEvery
      assert.equal(settings.trigger.displayFrequency, 'every-session')

      const triggerOnceAndNeverAgain = { displayFrequency: 'never' }
      settings.trigger = triggerOnceAndNeverAgain
      assert.equal(settings.trigger.displayFrequency, 'never')

      const triggerOnDelay = {
        displayFrequency: 'delay',
        displayFrequencyDelay: faker.datatype.number(),
      }
      settings.trigger = triggerOnDelay
      assert.throws(() => {
        settings.trigger = { displayFrequencyDelay: faker.lorem.word() }
      })
      assert.equal(settings.trigger.displayFrequency, 'delay')
      assert.equal(settings.trigger.displayFrequencyDelay, triggerOnDelay.displayFrequencyDelay)
      assert.throws(() => {
        settings.trigger = { displayFrequency: 'invalid' }
      })
    })
    describe('URL targeting', () => {
      it('Should get the allow and deny list', () => {
        const settings = new Settings()
        assert.deepEqual(settings.trigger.allowListUrls, [])
        assert.deepEqual(settings.trigger.denyListUrls, [])
      })
      it('Should set the allow and deny list', () => {
        const settings = new Settings()
        const allowList = [
          {
            path: faker.internet.url(),
            type: 'contain',
          },
          {
            path: faker.internet.url(),
            type: 'exact',
          },
        ]
        settings.trigger = { allowListUrls: allowList }
        assert.deepEqual(settings.trigger.allowListUrls, allowList)
        const denyList = [
          {
            path: faker.internet.url(),
            type: 'contain',
          },
          {
            path: faker.internet.url(),
            type: 'exact',
          },
        ]
        settings.trigger = { denyListUrls: denyList }
        assert.deepEqual(settings.trigger.denyListUrls, denyList)
        settings.trigger = { allowListUrls: [] }
        assert.deepEqual(settings.trigger.allowListUrls, [])
        settings.trigger = { denyListUrls: [] }
        assert.deepEqual(settings.trigger.denyListUrls, [])
      })
      it('Should reject invalid allow and deny lists', () => {
        const settings = new Settings()
        assert.throws(() => {
          settings.trigger = {
            allowListUrls: [{ path: '/test' }],
          }
        })
        assert.throws(() => {
          settings.trigger = {
            allowListUrls: [{ path: 'test', type: 'invalid' }],
          }
        })
        assert.throws(() => {
          settings.trigger = {
            allowListUrls: [{ type: 'contain' }],
          }
        })
        assert.throws(() => {
          settings.trigger = {
            allowListUrls: [{ path: null, type: 'contain' }],
          }
        })
        assert.throws(() => {
          settings.trigger = {
            allowListUrls: [{ type: 'contains' }],
          }
        })
        assert.throws(() => {
          settings.trigger = { allowListUrls: 'invalid' }
        })
        assert.throws(() => {
          settings.trigger = { denyListUrls: 'invalid' }
        })
      })
    })
  })
  describe('heroImage', () => {
    it('Should get and set the hero image', () => {
      const options = ['left', 'right', 'top', 'none']
      const settings = new Settings()
      options.forEach((option) => {
        settings.heroImage = { position: option }
        assert.equal(settings.heroImage.position, option)
      })
      assert.throws(() => { settings.heroImage = { position: 'invalid' } })
    })
  })
  describe('brandLogo', () => {
    it('Should get and set the brandLogo', () => {
      const settings = new Settings()
      const brandLogoSettings = {
        url: faker.image.imageUrl(),
        size: faker.datatype.number(),
        fileName: `${faker.hacker.noun()}.jpg`,
      }
      settings.brandLogo = brandLogoSettings
      assert.deepEqual(settings.brandLogo, brandLogoSettings)
    })
  })
  describe('primaryButton', () => {
    it('Should get and set the primary button', () => {
      const settings = new Settings()
      const primaryButtonSettings = {
        design: 'filled',
        color: '#ffffff',
        borderRadius: 20,
      }
      settings.primaryButton = primaryButtonSettings
      assert.deepEqual(settings.primaryButton, primaryButtonSettings)
      settings.primaryButton = { design: 'outline' }
      assert.equal(settings.primaryButton.design, 'outline')
      assert.throws(() => { settings.primaryButton = { design: 'invalid' } })

      const borderRadius = faker.datatype.number()
      settings.primaryButton = { borderRadius }
      assert.equal(settings.primaryButton.borderRadius, borderRadius)
    })
  })
  describe('secondaryButton', () => {
    it('Should get and set the secondary button', () => {
      const settings = new Settings()
      const secondaryButtonSettings = {
        design: 'text link',
        color: '#ffffff',
        borderRadius: 30,
      }
      settings.secondaryButton = secondaryButtonSettings
      assert.deepEqual(settings.secondaryButton, secondaryButtonSettings)
      settings.secondaryButton = { design: 'outline' }
      assert.equal(settings.secondaryButton.design, 'outline')
      assert.throws(() => { settings.secondaryButton = { design: 'invalid' } })
      const borderRadius = faker.datatype.number()
      settings.secondaryButton = { borderRadius }
      assert.equal(settings.secondaryButton.borderRadius, borderRadius)
    })
  })
  describe('themeColors', () => {
    it('Should get and set the theme colors', () => {
      const settings = new Settings()
      const color1 = faker.lorem.word()
      settings.themeColors = { inputBorder: color1 }
      assert.equal(settings.themeColors.inputBorder, color1)
      const color2 = faker.lorem.word()
      settings.themeColors = { inputBorder: color2 }
      assert.equal(settings.themeColors.inputBorder, color2)
      assert.throws(() => { settings.themeColors = faker.lorem.word() })
    })
    it('Should update theme colors on mobile', () => {
      const settings = new Settings()
      const color = faker.lorem.word()
      settings.themeColors = { background: color }
      settings.viewMode = 'mobile'
      assert.equal(settings.themeColors.background, color)
      const mobileColor = faker.lorem.word()
      settings.themeColors = { background: mobileColor }
      assert.equal(settings.themeColors.background, mobileColor)
      settings.viewMode = 'desktop'
      assert.equal(settings.themeColors.background, color)
    })
  })

  describe('pages', () => {
    it('Should get pages', () => {
      const settings = new Settings()
      assert.equal(settings.pages.length, defaultPageCount)
    })

    it('Should add pages', () => {
      const settings = new Settings()
      assert.equal(settings.pages.length, defaultPageCount)
      const newPage = settings.addPage()
      assert.equal(settings.pages.length, defaultPageCount + 1)
      const pageIndex = settings.pages.findIndex((page) => page === newPage)
      assert.equal(pageIndex, 2, 'Page should be added between the second page and the thank you page')
    })

    it('Should remove pages', () => {
      const settings = new Settings()
      assert.equal(settings.pages.length, defaultPageCount)
      const newPage = settings.addPage()
      assert.equal(settings.pages.length, defaultPageCount + 1)
      settings.removePage(newPage)
      assert.equal(settings.pages.length, defaultPageCount)
      assert.throws(() => {
          settings.removePage(settings.pages[settings.pages.length - 1])
        },
        'Cannot delete the last page'
      )
    })
  })
  describe('getSaveObj', () => {
    it('Should export and import JSON', () => {
      const settings = new Settings()
      const newPage = settings.addPage()
      newPage.addInput(settings.getInput('state'))
      const lightboxName = faker.lorem.word()
      settings.name = lightboxName
      const exportData = settings.getSaveObj()
      const newSettings = new Settings(exportData)

      assert((newSettings.name = lightboxName))
      assert.equal(newSettings.pages.length, defaultPageCount + 1)
      assert.equal(newSettings.pages[2].inputs[0].label, 'State')
    })
  })
  describe('launchedAt and createdAt', () => {
    it('Should read launched and created at dates', () => {
      const settings = new Settings()
      const exportData = settings.getSaveObj()

      const launchedAt = faker.lorem.word()
      const createdAt = faker.lorem.word()
      exportData.launchedAt = launchedAt
      exportData.createdAt = createdAt

      const updatedSettings = new Settings(exportData)
      assert.equal(updatedSettings.launchedAt, launchedAt)
      assert.equal(updatedSettings.createdAt, createdAt)
    })
  })
  describe('autoCloseDelay', () => {
    it('Should be null by default', () => {
      const settings = new Settings()
      const exportData = settings.getSaveObj()
      assert.equal(exportData.autoCloseDelay, null)
    })
    it('Should allow to be set to 0', () => {
      const settings = new Settings()
      settings.autoCloseDelay = 0
      const exportData = settings.getSaveObj()
      assert.equal(exportData.autoCloseDelay, 0)
    })
    it('Should set a value', () => {
      const settings = new Settings()
      const value = 12
      settings.autoCloseDelay = value
      const exportData = settings.getSaveObj()
      assert.equal(exportData.autoCloseDelay, value)
    })
    it('Should throw an error if string', () => {
      const settings = new Settings()
      const value = faker.lorem.word()
      assert.throws(() => { settings.autoCloseDelay = value })
    })
    it('Should throw an error if NaN', () => {
      const settings = new Settings()
      const value = '12d'
      assert.throws(() => { settings.autoCloseDelay = value })
    })
    it('Should throw an error if Object', () => {
      const settings = new Settings()
      const value = {}
      assert.throws(() => { settings.autoCloseDelay = value })
    })
  })
})
