import { useState, useRef } from 'react'
import Settings from './Settings'

const useLightboxSettings = () => {
  const settingsRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [, setUpdate] = useState({})
  const [isUpdated, setIsUpdated] = useState(false)
  const rerender = () => {
    setUpdate({})
  }

  const onSettingsChange = () => {
    setIsUpdated(true)
    rerender()
  }

  const setSettings = (newSettings = null, formType) => {
    settingsRef.current = new Settings(newSettings, onSettingsChange, formType)
    setIsLoaded(true)
    rerender()
    return settingsRef.current
  }

  const create = ({ name, brandId, type = 'popup' }) => {
    const settings = setSettings(null, type)
    settings.name = name
    settings.brandId = brandId
    rerender()
  }

  const getSettings = () =>  settingsRef.current

  const resetIsUpdated = () => {
    setIsUpdated(false)
  }

  return {
    isLoaded,
    isUpdated,
    resetIsUpdated,
    setSettings,
    create,
    getSettings,
    getInput: isLoaded ? (type) => getSettings().getInput(type) : () => null,
  }
}

export default useLightboxSettings
