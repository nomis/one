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
import { Redirect, Route } from 'react-router-dom'

import { useAuth, useAuthApi } from 'client/features/Auth'

/**
 * Private route.
 *
 * @param {object} props - Route props
 * @returns {Redirect|Route}
 * - If current user isn't authenticated, then redirect to landing page
 */
const ProtectedRoute = props => {
  const { isLogged, jwt } = useAuth()
  const { getAuthUser } = useAuthApi()

  React.useEffect(() => {
    jwt && getAuthUser()
  }, [])

  return isLogged ? <Route {...props}/> : <Redirect to='/' />
}

export default ProtectedRoute
