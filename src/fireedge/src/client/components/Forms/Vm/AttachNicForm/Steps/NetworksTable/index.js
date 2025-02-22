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

import { useListForm } from 'client/hooks'
import { VNetworksTable } from 'client/components/Tables'

import {
  SCHEMA
} from 'client/components/Forms/Vm/AttachNicForm/Steps/NetworksTable/schema'
import { T } from 'client/constants'

export const STEP_ID = 'network'

const NetworkStep = () => ({
  id: STEP_ID,
  label: T.Network,
  resolver: () => SCHEMA,
  content: useCallback(
    ({ data, setFormData }) => {
      const selectedNetwork = data?.[0]

      const {
        handleSelect,
        handleClear
      } = useListForm({ key: STEP_ID, setList: setFormData })

      const handleSelectedRows = rows => {
        const { original } = rows?.[0] ?? {}
        const { ID, NAME, UID, UNAME, SECURITY_GROUPS } = original ?? {}

        const network = {
          NETWORK_ID: ID,
          NETWORK: NAME,
          NETWORK_UID: UID,
          NETWORK_UNAME: UNAME,
          SECURITY_GROUPS
        }

        ID !== undefined ? handleSelect(network) : handleClear()
      }

      return (
        <VNetworksTable
          singleSelect
          onlyGlobalSearch
          onlyGlobalSelectedRows
          initialState={{ selectedRowIds: { [selectedNetwork?.ID]: true } }}
          onSelectedRowsChange={handleSelectedRows}
        />
      )
    }, [])
})

export default NetworkStep
