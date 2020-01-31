import React from "react"
import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"
import { useStaticQuery, graphql } from "gatsby"

import locales from "../../cms/config/locales"
import { getResolvedLocale, isDefaultLng } from "../utils/i18n"

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    initImmediate: false,
    whitelist: locales.map(locale => locale.code.substr(0, 2)),
    nonExplicitWhitelist: true,
    load: "languageOnly",
    resources: locales.reduce(
      (acc, locale) => ({
        ...acc,
        [locale.code.substr(0, 2)]: locale,
      }),
      {}
    ),
    debug: true,
    lowerCaseLng: true,
    detection: {
      order: ["path", "localStorage", "navigator"],
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

let isRedirecting = false
const resolvedLocale = getResolvedLocale(i18next)

if (
  typeof window !== "undefined" &&
  window.location.pathname === "/" &&
  !isDefaultLng(resolvedLocale.code)
) {
  isRedirecting = true
  window.location = `/${resolvedLocale.code}`
}

function Root({ children, pageContext }) {
  const data = useStaticQuery(graphql`
    query Commons {
      sanityMisc {
        name
      }
      sanitySiteSettings {
        title {
          localized
        }
        description {
          localized
        }
      }
    }
  `)

  // Load commons data in i18next
  i18next.addResourceBundle(pageContext.locale, "translations", {
    commons: data.sanityMisc,
    settings: data.sanitySiteSettings,
  })

  return isRedirecting ? null : children
}

export default Root
