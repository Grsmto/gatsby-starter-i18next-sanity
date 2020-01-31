import locales from "../config/locales"

export default {
  supportedLanguages: locales.map(locale => ({
    ...locale,
    id: locale.code.substr(0, 2),
    title: locale.name,
  })),
  filterField: (enclosingType, field, selectedLanguageIds) => {
    return (
      !enclosingType.name.startsWith("locale") ||
      selectedLanguageIds.includes(field.name)
    )
  },
}
