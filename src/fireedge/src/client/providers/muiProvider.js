/* ------------------------------------------------------------------------- *
 * Copyright 2002-2021, OpenNebula Project, OpenNebula Systems               *
 *                                                                           *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may   *
 * not use this file except in compliance with the License. You may obtain   *
 * a copy of the License at                                                  *
 *                                                                           *
 * http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                           *
 * Unless required by applicable law or agreed to in writing, software       *
 * distributed under the License is distributed on an "AS IS" BASIS,         *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 * See the License for the specific language governing permissions and       *
 * limitations under the License.                                            *
 * ------------------------------------------------------------------------- */
/* eslint-disable jsdoc/require-jsdoc */
import * as React from 'react'
import PropTypes from 'prop-types'

import { CssBaseline, ThemeProvider, StylesProvider, useMediaQuery } from '@material-ui/core'
import { createTheme, generateClassName } from 'client/theme'
import { useAuth } from 'client/features/Auth'
import { SCHEMES } from 'client/constants'

const { DARK, LIGHT, SYSTEM } = SCHEMES

const MuiProvider = ({ theme: appTheme, children }) => {
  const { settings: { scheme } = {} } = useAuth()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const changeScheme = () => {
    const prefersScheme = prefersDarkMode ? DARK : LIGHT
    const newScheme = scheme === SYSTEM ? prefersScheme : scheme

    return createTheme(appTheme(newScheme))
  }

  const [muitheme, setTheme] = React.useState(changeScheme)

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  React.useEffect(() => {
    setTheme(changeScheme)
  }, [scheme, prefersDarkMode])

  return (
    <ThemeProvider theme={muitheme}>
      <CssBaseline />
      <StylesProvider generateClassName={generateClassName}>
        {children}
      </StylesProvider>
    </ThemeProvider>
  )
}

MuiProvider.propTypes = {
  theme: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

MuiProvider.defaultProps = {
  theme: () => {},
  children: undefined
}

export default MuiProvider
