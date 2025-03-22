import { assert } from 'chai'
import faker from 'faker'
import Input from '../lib/Input'

describe('Input', () => {
  describe('type', () => {
    it('should get and set type', () => {
      const input = new Input('firstName')
      assert.equal(input.label, 'First Name')
    })
    it('should throw an error when picking an invalid type', () => {
      assert.throws(() => { new Input('Invalid123') })
    })
  })
  describe('isTemplate', () => {
    it('should detect template fields', () => {
      const input = new Input('firstName')
      assert.equal(input.isTemplate, true)
      const input2 = new Input('customText')
      assert.equal(input2.isTemplate, false)
    })
  })
  describe('label', () => {
    it('should not allow editting the label of a template field', () => {
      const input = new Input('firstName')
      assert.throws(() => { input.label = 'test' })
    })
    it('should allow editting the label on a custom field', () => {
      const input = new Input('customText')
      const newLabel = faker.random.word()
      input.label = newLabel
      assert.equal(input.label, newLabel)
    })
  })
  describe('placeholder', () => {
    it('should allow getting and setting the placeholder', () => {
      const input = new Input('firstName')
      const newPlaceHolder = faker.random.word()
      input.placeholder = newPlaceHolder
      assert.equal(input.placeholder, newPlaceHolder)
    })
  })
  describe('isRequired', () => {
    it('should mark fields as required', () => {
      const input = new Input('firstName')
      assert.equal(input.isRequired, false)
      input.isRequired = true
      assert.equal(input.isRequired, true)
    })
  })
  describe('dropdownOptions', () => {
    it('should be able to set and get dropdown options', () => {
      const input = new Input('customDropdown')
      assert.equal(input.dropdownOptions.length, 0)
      input.dropdownOptions = [faker.random.word(), faker.random.word(), faker.random.word()]
      assert.equal(input.dropdownOptions.length, 3)
    })
  })
})
