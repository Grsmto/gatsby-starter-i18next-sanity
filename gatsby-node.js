const locales = require("./cms/config/locales")

// Take the pages from src/pages and generate pages for all locales, e.g. /index and /en/index
exports.onCreatePage = ({ page, actions }) => {
  locales.forEach(locale => {
    // Create the "slugs" for the pages. Unless default language, add prefix àla "/en"
    const localizedPath = locale.isDefault
      ? page.path
      : `${locale.path}${page.path}`

    return createPage(
      actions,
      {
        ...page,
        path: localizedPath,
      },
      locale.code
    )
  })
}

const createPage = (actions, page, locale) => {
  const { path, component, context } = page

  return actions.createPage({
    path,
    component,
    context: {
      ...context,
      locale,
    },
  })
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SanityLocaleString: {
      localized: {
        type: `String!`,
        resolve(source, args, context) {
          return source[context.locale || args.locale] || source["en"]
        },
      },
    },
  })
}
