import locales from "../config/locales"

export default {
  name: "localeBlockContent",
  title: "Translatable block of content",
  type: "object",
  // fieldsets: [
  //   {
  //     title: "Translations",
  //     name: "translations",
  //     options: { collapsible: true },
  //   },
  // ],
  fields: locales.map(locale => ({
    title: " ",
    name: locale.code.substr(0, 2),
    type: "blockContent",
    // fieldset: locale.isDefault ? null : "translations",
  })),
}
