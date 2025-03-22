const Joi = require('joi')

const schemaTriggerUrl = Joi.object({
  path: Joi.string().required(),
  type: Joi.string().valid('contain', 'exact').required(),
})

const schemaBrandLogo = Joi.object({
  url: Joi.string().allow(null).required(),
  size: Joi.number().integer().positive().required(),
  fileName: Joi.string().allow(null).required(),
})

const schemaButtonPrimary = Joi.object({
  design: Joi.string().valid('filled', 'outline').required(),
  color: Joi.string().required(),
  borderRadius: Joi.number().allow(null).required(),
})

const schemaButtonSecondary = Joi.object({
  design: Joi.string().valid('outline', 'text link').required(),
  color: Joi.string().required(),
  borderRadius: Joi.number().allow(null).required(),
})

const schemaPageContent = Joi.object({
  content: Joi.string().required(),
  isViewable: Joi.boolean().required(),
})

const schemaInput = Joi.object({
  type: Joi.string().valid('text', 'dropdown', 'date'),
  isTemplate: Joi.boolean().required(),
  label: Joi.string().required(),
  placeholder: Joi.string().required(),
  isRequired: Joi.boolean().required(),
  dropdownOptions: Joi.array().items(Joi.string()),
  espValue: Joi.string().allow(null),
})

const schemaPageButton = Joi.object({
  desktop: Joi.object({
    content: Joi.string().required(),
    isViewable: Joi.boolean(),
  }),
  mobile: Joi.object({
    content: Joi.string().required(),
    isViewable: Joi.boolean(),
  }).allow(null),
})

const schemaPage = Joi.object({
  title: {
    desktop: schemaPageContent,
    mobile: Joi.alternatives(null, schemaPageContent),
  },
  subtitle: {
    desktop: schemaPageContent,
    mobile: Joi.alternatives(null, schemaPageContent),
  },
  heroImage: {
    fileName: Joi.string().allow(null).required(),
    url: Joi.string().allow(null).required(),
  },
  inputs: Joi.array().items(schemaInput),
  primaryButton: schemaPageButton,
  secondaryButton: schemaPageButton,
})

const schemaFields = Joi.object({
  borderRadius: Joi.number().allow(null),
})

const schemaEsp = Joi.object({
  brandIntegrationId: Joi.number().integer().allow(null).required(),
  listId: Joi.string().allow(null).required(),
  espDojoProperty: Joi.string().allow(null).required(),
})

const schemaTrigger = Joi.object({
  type: Joi.string().valid('immediately', 'exit', 'delay').required(),
  delay: Joi.number().integer().positive().allow(null, 0).required(),
  displayFrequency: Joi.string().valid('every-session', 'delay', 'never').required(),
  displayFrequencyDelay: Joi.number().integer().positive().allow(0).required(),
  allowListUrls: Joi.array().items(schemaTriggerUrl).required(),
  denyListUrls: Joi.array().items(schemaTriggerUrl).required(),
})

const schemaHeroImage = Joi.object({
  position: Joi.string().valid('left', 'right', 'top', 'none').required(),
})

export const schemaDefinitions = {
  id: Joi.string().max(9).allow(null).required(),
  name: Joi.string().required(),
  type: Joi.string().valid('popup', 'embed').required(),
  status: Joi.string().valid('active', 'inactive').required(),
  brandId: Joi.number().integer().required(),
  brandName: Joi.string().allow(null).required(),
  termsUrl: Joi.string().allow(null).required(),
  privacyUrl: Joi.string().allow(null).required(),
  domain: Joi.string().allow(null).required(),
  launchedAt: Joi.date().allow(null).required(),
  createdAt: Joi.date().allow(null).required(),
  autoCloseDelay: Joi.number().integer().positive().allow(null, 0).required(),
  smsCampaignId: Joi.number().integer().positive().allow(null).required(),
  esp: schemaEsp.required(),
  trigger: schemaTrigger.required(),
  heroImage: schemaHeroImage.required(),
  brandLogo: {
    desktop: schemaBrandLogo.required(),
    mobile: Joi.alternatives(null, schemaBrandLogo).required(),
  },
  buttons: {
    primary: {
      desktop: schemaButtonPrimary.required(),
      mobile: Joi.alternatives(null, schemaButtonPrimary).required(),
    },
    secondary: {
      desktop: schemaButtonSecondary.required(),
      mobile: Joi.alternatives(null, schemaButtonSecondary).required(),
    },
  },
  fields: {
    desktop: schemaFields.required(),
    mobile: Joi.alternatives(null, schemaFields).required(),
  },
  themeColors: {
    background: {
      desktop: Joi.string().required(),
      mobile: Joi.string().allow(null).required(),
    },
    closeIcon: {
      desktop: Joi.string().required(),
      mobile: Joi.string().allow(null).required(),
    },
    legalText: {
      desktop: Joi.string().required(),
      mobile: Joi.string().allow(null).required(),
    },
    legalLinks: {
      desktop: Joi.string().required(),
      mobile: Joi.string().allow(null).required(),
    },
    inputBorder: {
      desktop: Joi.string().required(),
      mobile: Joi.string().allow(null).required(),
    },
    inputBackground: {
      desktop: Joi.string().required(),
      mobile: Joi.string().allow(null).required(),
    },
    inputPlaceholder: {
      desktop: Joi.string().required(),
      mobile: Joi.string().allow(null).required(),
    },
    inputText: {
      desktop: Joi.string().required(),
      mobile: Joi.string().allow(null).required(),
    },
  },
  pages: Joi.array().items(schemaPage),
}

export const validateSignupFormSettings = (settings) => {
  const validationResponse = Joi.object(schemaDefinitions).validate(settings)
  return validationResponse
}
