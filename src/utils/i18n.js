import React, { useContext } from "react"
import locales from "@sveasolar/cms/config/locales"

export const LocalesContext = React.createContext()

export const getResolvedLocale = i18n => {
  let currentLng

  for (let language of i18n.languages) {
    currentLng = locales.find(locale => locale.code.substr(0, 2) === language)

    if (currentLng) {
      break
    }
  }

  return currentLng
}

export const isDefaultLng = lng => {
  return !!locales.find(locale => locale.code === lng && locale.isDefault)
}

export const localizeUrl = (t, { url } = {}) => {
  const parsedUrl = url === "/" ? "" : url
  return isDefaultLng(t("code", { ns: "config" }))
    ? `${parsedUrl}/`
    : `/${t("path", { ns: "config" })}${parsedUrl}/`
}

export const getLocaleForCode = code =>
  locales.find(locale => locale.code.substr(0, 2) === code)

export const useI18n = () => useContext(LocalesContext)
