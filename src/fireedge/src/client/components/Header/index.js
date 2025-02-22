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

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery
  // useScrollTrigger
} from '@material-ui/core'
import { Menu as MenuIcon } from 'iconoir-react'

import { useAuth } from 'client/features/Auth'
import { useGeneral, useGeneralApi } from 'client/features/General'

import User from 'client/components/Header/User'
import View from 'client/components/Header/View'
import Group from 'client/components/Header/Group'
import Zone from 'client/components/Header/Zone'
import headerStyles from 'client/components/Header/styles'

const Header = ({ scrollContainer }) => {
  const { isOneAdmin } = useAuth()
  const { title } = useGeneral()
  const { fixMenu } = useGeneralApi()

  const isUpLg = useMediaQuery(theme => theme.breakpoints.up('lg'))
  const isMobile = useMediaQuery(theme => theme.breakpoints.only('xs'))

  /* const isScroll = scrollContainer && useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: scrollContainer
  }) */

  const classes = headerStyles({ isScroll: false })

  const handleFixMenu = () => {
    fixMenu(true)
  }

  return (
    <AppBar className={classes.appbar} data-cy="header" elevation={1}>
      <Toolbar>
        {!isUpLg && (
          <IconButton onClick={handleFixMenu} edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        )}
        {!isMobile && (
          <Typography
            variant="h6"
            className={classes.title}
            data-cy="header-title"
          >
            {'One'}
            <span className={classes.app}>{title}</span>
          </Typography>
        )}
        <Box flexGrow={isMobile ? 1 : 0} textAlign="end">
          <User />
          <View />
          {!isOneAdmin && <Group />}
          <Zone />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  scrollContainer: PropTypes.object
}

Header.defaultProps = {
  scrollContainer: null
}

export default Header
