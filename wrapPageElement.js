import React from "react"

import Root from "./src/components/Root"

const wrapPageElement = ({ element, props }) => (
  <Root {...props}>{element}</Root>
)

export default wrapPageElement
