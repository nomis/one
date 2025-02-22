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
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'
import { Box, Button, Slide } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'

import loginStyles from 'client/containers/Login/styles'

import FormWithSchema from 'client/components/Forms/FormWithSchema'
import { SubmitButton } from 'client/components/FormControl'
import { Tr } from 'client/components/HOC'
import { T } from 'client/constants'

const Form = ({ onBack, onSubmit, resolver, fields, error, isLoading, transitionProps }) => {
  const defaultValues = resolver.default()
  const classes = loginStyles()

  const { handleSubmit, setError, ...methods } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues,
    resolver: yupResolver(resolver)
  })

  useEffect(() => {
    error && setError(fields[0].name, { type: 'manual', message: error })
  }, [error])

  return (
    <Slide
      timeout={{ enter: 400 }}
      mountOnEnter
      unmountOnExit
      {...transitionProps}
    >
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(classes.form, { [classes.loading]: isLoading })}
      >
        <FormProvider {...methods}>
          <FormWithSchema cy='login' fields={fields} />
        </FormProvider>
        <Box display='flex' my={2}>
          {onBack && (
            <Button onClick={onBack} disabled={isLoading}>
              {Tr(T.Back)}
            </Button>
          )}
          <SubmitButton
            color='secondary'
            data-cy='login-button'
            isSubmitting={isLoading}
            label={onBack ? Tr(T.Next) : Tr(T.SignIn)}
          />
        </Box>
      </Box>
    </Slide>
  )
}

Form.propTypes = {
  onBack: PropTypes.func,
  resolver: PropTypes.object,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ),
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  transitionProps: PropTypes.shape({
    name: PropTypes.string
  })
}

Form.defaultProps = {
  onBack: undefined,
  onSubmit: () => undefined,
  resolver: {},
  fields: [],
  error: undefined,
  isLoading: false,
  transitionProps: undefined
}

export default Form
