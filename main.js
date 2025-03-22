/**
 * Main ES module - exported as CommonJS via ./index.js
 * Set to be "module" in package.json and in "exports" as "import" export
 **/

import useLightboxSettings from './lib/useLightboxSettings'
import { validateSignupFormSettings } from './lib/utils/validations'

export default useLightboxSettings
export { validateSignupFormSettings }
