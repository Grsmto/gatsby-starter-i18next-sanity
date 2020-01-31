import icon from "react-icons/lib/md/settings"

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  liveEdit: false,
  __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
  icon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "localeString",
    },
    {
      name: "description",
      title: "Description",
      type: "localeString",
    },
  ],
}
