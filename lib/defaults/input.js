const defaultInput = {
  type: 'text',
  isTemplate: false,
  label: '',
  placeholder: '',
  isRequired: false,
  dropdownOptions: [],
  espValue: null,
}
export default {
  phone: {
    ...defaultInput,
    isTemplate: true,
    label: 'Phone',
    placeholder: 'Mobile Phone',
    isRequired: false,
  },
  email: {
    ...defaultInput,
    isTemplate: true,
    label: 'Email',
    placeholder: 'Email Address',
  },
  firstName: {
    ...defaultInput,
    label: 'First Name',
    isTemplate: true,
    placeholder: 'First Name',
  },
  lastName: {
    ...defaultInput,
    label: 'Last Name',
    isTemplate: true,
    placeholder: 'Last Name',
  },
  zipCode: {
    ...defaultInput,
    label: 'Zip Code',
    isTemplate: true,
    placeholder: 'Zip Code',
  },
  birthday: {
    ...defaultInput,
    label: 'Birthday',
    type: 'date',
    isTemplate: true,
    placeholder: 'Birthday',
  },
  city: {
    ...defaultInput,
    label: 'City',
    isTemplate: true,
    placeholder: 'City',
  },
  state: {
    ...defaultInput,
    type: 'dropdown',
    label: 'State',
    isTemplate: true,
    placeholder: 'State',
  },
  customText: { ...defaultInput },
  customDropdown: {
    ...defaultInput,
    type: 'dropdown',
  },
}
