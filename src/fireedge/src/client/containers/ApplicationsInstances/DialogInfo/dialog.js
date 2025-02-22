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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useMediaQuery
} from '@material-ui/core'

import { Tr } from 'client/components/HOC'
import { T } from 'client/constants'

const CustomDialog = ({ title, handleClose, children }) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.only('xs'))

  return (
    <Dialog
      fullScreen={isMobile}
      open
      onClose={handleClose}
      maxWidth="xl"
      scroll="paper"
      PaperProps={{
        style: {
          height: isMobile ? '100%' : '90%',
          width: isMobile ? '100%' : '90%'
        }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        dividers
        style={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {Tr(T.Cancel)}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

CustomDialog.propTypes = {
  title: PropTypes.string,
  handleClose: PropTypes.func,
  children: PropTypes.any
}

CustomDialog.defaultProps = {
  title: 'Application',
  handleClose: undefined,
  children: undefined
}

export default CustomDialog
