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
import React, { memo } from 'react'
import PropTypes from 'prop-types'

import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  makeStyles
} from '@material-ui/core'
import { Cancel as CancelIcon } from 'iconoir-react'

import { Action } from 'client/components/Cards/SelectCard'
import { Tr } from 'client/components/HOC'
import { T } from 'client/constants'

const useStyles = makeStyles({
  title: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    gap: '2em'
  },
  titleText: {
    flexGrow: 1
  }
})

const DialogConfirmation = memo(
  ({
    open = true,
    title = '',
    subheader,
    contentProps,
    handleAccept,
    acceptButtonProps,
    handleCancel,
    cancelButtonProps,
    handleEntering,
    children
  }) => {
    const classes = useStyles()
    const isMobile = useMediaQuery(theme => theme.breakpoints.only('xs'))

    return (
      <Dialog
        fullScreen={isMobile}
        onEntering={handleEntering}
        open={open}
        onClose={handleCancel}
        maxWidth='lg'
        scroll='paper'
      >
        <DialogTitle disableTypography className={classes.title}>
          <div className={classes.titleText}>
            <Typography variant='h6'>{Tr(title)}</Typography>
            {subheader && <Typography variant='subtitle1'>{Tr(subheader)}</Typography>}
          </div>
          {handleCancel && (
            <IconButton
              aria-label='close'
              onClick={handleCancel}
              data-cy='dg-cancel-button'
              {...cancelButtonProps}
            >
              <CancelIcon />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent dividers {...contentProps}>
          {children}
        </DialogContent>
        {handleAccept && (
          <DialogActions>
            <Action
              color='secondary'
              data-cy='dg-accept-button'
              handleClick={handleAccept}
              icon={false}
              label={T.Accept}
              {...acceptButtonProps}
            />
          </DialogActions>
        )}
      </Dialog>
    )
  }
)

export const DialogPropTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  contentProps: PropTypes.objectOf(PropTypes.any),
  handleAccept: PropTypes.func,
  acceptButtonProps: PropTypes.objectOf(PropTypes.any),
  handleCancel: PropTypes.func,
  cancelButtonProps: PropTypes.objectOf(PropTypes.any),
  handleEntering: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

DialogConfirmation.propTypes = DialogPropTypes

DialogConfirmation.displayName = 'DialogConfirmation'

export default DialogConfirmation
