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

const { addFunctionAsRoute, setFunctionRoute } = require('server/utils/server')
const { routes: serviceRoutes } = require('./service')
const { routes: serviceTemplateRoutes } = require('./service_template')

const { SERVICE, SERVICE_TEMPLATE } = require('./string-routes')

const privateRoutes = []
const publicRoutes = []

/**
 * Set private routes.
 *
 * @param {object} methods - object of routes
 * @param {string} path - principal route
 * @param {Function} action - function of route
 */
const setPrivateRoutes = (methods = {}, path = '', action = () => undefined) => {
  if (Object.keys(methods).length > 0 && methods.constructor === Object) {
    Object.keys(methods).forEach((method) => {
      privateRoutes.push(
        setFunctionRoute(method, path,
          (req, res, next, connection, userId, user) => {
            action(req, res, next, methods[method], user, connection)
          })
      )
    })
  }
}

/**
 * Add routes.
 *
 * @returns {Array} routes
 */
const generatePrivateRoutes = () => {
  setPrivateRoutes(serviceRoutes, SERVICE, addFunctionAsRoute)
  setPrivateRoutes(serviceTemplateRoutes, SERVICE_TEMPLATE, addFunctionAsRoute)
  return privateRoutes
}

const functionRoutes = {
  private: generatePrivateRoutes(),
  public: publicRoutes
}

module.exports = functionRoutes
