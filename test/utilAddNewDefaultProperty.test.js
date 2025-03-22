import { assert } from 'chai'
import faker from 'faker'
import addNewDefaultProperty from '../lib/utils/addNewDefaultProperty'

describe('Util - addNewDefaultProperty', () => {
  it('Should add a new default property to desktop and mobile', () => {
    const obj = { desktop: {}, mobile: {} }
    const property = faker.lorem.word()
    const defaultValue = faker.lorem.word()
    addNewDefaultProperty(obj, property, defaultValue)
    assert.isDefined(obj.desktop[property])
    assert.isDefined(obj.mobile[property])
    assert.equal(obj.desktop[property], defaultValue)
    assert.equal(obj.mobile[property], defaultValue)
  })
  it('Should ignore mobile when null', () => {
    const obj = { desktop: {}, mobile: null }
    const property = faker.lorem.word()
    const defaultValue = faker.lorem.word()
    addNewDefaultProperty(obj, property, defaultValue)
    assert.isDefined(obj.desktop[property])
    assert.isNull(obj.mobile)
    assert.equal(obj.desktop[property], defaultValue)
  })
})
