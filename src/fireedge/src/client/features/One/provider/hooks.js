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
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import * as actions from 'client/features/One/provider/actions'
import { RESOURCES } from 'client/features/One/slice'

export const useProvider = () => (
  useSelector(state => state.one[RESOURCES.document[102]])
)

export const useProviderApi = () => {
  const dispatch = useDispatch()

  const unwrapDispatch = useCallback(
    action => dispatch(action).then(unwrapResult)
    , [dispatch]
  )

  return {
    getProvider: id => unwrapDispatch(actions.getProvider({ id })),
    getProviders: () => dispatch(actions.getProviders()),
    getProviderConnection: id => unwrapDispatch(actions.getProviderConnection({ id })),
    createProvider: data => unwrapDispatch(actions.createProvider({ data })),
    updateProvider: (id, data) => unwrapDispatch(actions.updateProvider({ id, data })),
    deleteProvider: id => unwrapDispatch(actions.deleteProvider({ id }))
  }
}
