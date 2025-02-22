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
import * as React from 'react'

import SunstoneApp from 'client/apps/sunstone'
import ProvisionApp from 'client/apps/provision'

import { isDevelopment, isBackend } from 'client/utils'
import { _APPS, APPS } from 'client/constants'

/**
 * Render App by url: http://<host:port>/fireedge/<APP>.
 *
 * @param {object} props - Props from server
 * @returns {React.JSXElementConstructor} Returns App
 */
const DevelopmentApp = props => {
  let appName = ''

  if (isDevelopment() && !isBackend()) {
    const parseUrl = window.location.pathname
      .split(/\//gi)
      .filter(sub => sub?.length > 0)

    parseUrl.forEach(resource => {
      if (resource && APPS.includes(resource)) {
        appName = resource
      }
    })
  }

  return {
    [_APPS.provision.name]: <ProvisionApp {...props} />,
    [_APPS.sunstone.name]: <SunstoneApp {...props} />
  }[appName]
}

DevelopmentApp.displayName = 'DevelopmentApp'

export default DevelopmentApp
