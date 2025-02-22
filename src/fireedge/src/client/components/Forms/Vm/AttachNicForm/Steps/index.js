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
import * as yup from 'yup'

import NetworksTable from 'client/components/Forms/Vm/AttachNicForm/Steps/NetworksTable'
import AdvancedOptions from 'client/components/Forms/Vm/AttachNicForm/Steps/AdvancedOptions'

const Steps = stepProps => {
  const network = NetworksTable(stepProps)
  const advanced = AdvancedOptions(stepProps)

  const steps = [network, advanced]

  const resolver = () => yup.object({
    [network.id]: network.resolver(),
    [advanced.id]: advanced.resolver()
  })

  const defaultValues = resolver().default()

  return { steps, defaultValues, resolver }
}

export default Steps
