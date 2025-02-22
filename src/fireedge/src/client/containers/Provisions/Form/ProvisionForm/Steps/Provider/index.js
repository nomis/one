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
import React, { useCallback } from 'react'
import { useWatch } from 'react-hook-form'

import { useListForm } from 'client/hooks'
import { useOne } from 'client/features/One'
import { ListCards } from 'client/components/List'
import { EmptyCard, ProvisionCard } from 'client/components/Cards'
import { T } from 'client/constants'

import { STEP_ID as INPUTS_ID } from 'client/containers/Provisions/Form/ProvisionForm/Steps/Inputs'
import { STEP_ID as TEMPLATE_ID } from 'client/containers/Provisions/Form/ProvisionForm/Steps/Template'
import { STEP_FORM_SCHEMA } from 'client/containers/Provisions/Form/ProvisionForm/Steps/Provider/schema'

export const STEP_ID = 'provider'

const Provider = () => ({
  id: STEP_ID,
  label: T.Provider,
  resolver: () => STEP_FORM_SCHEMA,
  content: useCallback(({ data, setFormData }) => {
    const { providers } = useOne()
    const provisionTemplate = useWatch({ name: TEMPLATE_ID })
    const provisionTemplateSelected = provisionTemplate?.[0] ?? {}

    const providersByTypeAndService = React.useMemo(() =>
      providers.filter(({ TEMPLATE: { PLAIN = {} } = {} }) =>
        PLAIN.provider === provisionTemplateSelected.provider &&
        PLAIN.provision_type === provisionTemplateSelected.provision_type
      )
    , [])

    const {
      handleSelect,
      handleUnselect
    } = useListForm({ key: STEP_ID, setList: setFormData })

    const handleClick = (provider, isSelected) => {
      const { ID } = provider

      // reset inputs when selected provider changes
      setFormData(prev => ({ ...prev, [INPUTS_ID]: undefined }))

      isSelected
        ? handleUnselect(ID, item => item.ID !== ID)
        : handleSelect(provider)
    }

    return (
      <ListCards
        list={providersByTypeAndService}
        EmptyComponent={<EmptyCard title={'Your providers list is empty'} />}
        CardComponent={ProvisionCard}
        gridProps={{ 'data-cy': 'providers' }}
        cardsProps={({ value = {} }) => {
          const isSelected = data?.some(selected => selected.ID === value.ID)

          return {
            isProvider: true,
            isSelected,
            handleClick: () => handleClick(value, isSelected)
          }
        }}
      />
    )
  }, [])
})

export default Provider
