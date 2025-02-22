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

import { TextField } from '@material-ui/core'
import { Controller } from 'react-hook-form'

import { ErrorHelper } from 'client/components/FormControl'
import { Tr } from 'client/components/HOC'

const SelectController = memo(
  ({ control, cy, name, label, multiple, values, error, fieldProps }) => {
    const defaultValue = multiple ? [values?.[0]?.value] : values?.[0]?.value

    return (
      <Controller
        render={({ value: optionSelected, onChange, onBlur }) => (
          <TextField
            value={optionSelected ?? defaultValue}
            onBlur={onBlur}
            onChange={onChange}
            color='secondary'
            select
            fullWidth
            variant='outlined'
            margin='dense'
            SelectProps={{ native: true, multiple }}
            label={Tr(label)}
            inputProps={{ 'data-cy': cy }}
            error={Boolean(error)}
            helperText={Boolean(error) && <ErrorHelper label={error?.message} />}
            FormHelperTextProps={{ 'data-cy': `${cy}-error` }}
            {...fieldProps}
          >
            {values?.map(({ text, value = '' }) =>
              <option key={`${name}-${value}`} value={value}>
                {text}
              </option>
            )}
          </TextField>
        )}
        name={name}
        control={control}
      />
    )
  },
  (prevProps, nextProps) =>
    prevProps.error === nextProps.error &&
    prevProps.values.length === nextProps.values.length
)

SelectController.propTypes = {
  control: PropTypes.object,
  cy: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  multiple: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.objectOf(PropTypes.any)
  ]),
  fieldProps: PropTypes.object
}

SelectController.defaultProps = {
  control: {},
  cy: 'cy',
  name: '',
  label: '',
  multiple: false,
  values: [],
  error: false,
  fieldProps: undefined
}

SelectController.displayName = 'SelectController'

export default SelectController
