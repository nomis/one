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

// eslint-disable-next-line node/no-deprecated-api
const { parse } = require('url')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { readFileSync } = require('fs-extra')
const { getConfig } = require('server/utils/yml')
const { messageTerminal } = require('server/utils/general')
const { genPathResources, validateServerIsSecure } = require('server/utils/server')
const { writeInLogger } = require('server/utils/logger')
const { endpointVmrc, defaultPort } = require('server/utils/constants/defaults')

genPathResources()

const appConfig = getConfig()
const port = appConfig.port || defaultPort
const protocol = validateServerIsSecure() ? 'https' : 'http'
const url = `${protocol}://localhost:${port}`
const config = {
  color: 'red'
}
const vmrcProxy = createProxyMiddleware(endpointVmrc, {
  target: url,
  changeOrigin: false,
  ws: true,
  secure: /^(https):\/\/[^ "]+$/.test(url),
  logLevel: 'debug',
  pathRewrite: path => path.replace(endpointVmrc, '/ticket'),
  onError: err => {
    config.error = err.message
    config.message = 'Error connection : %s'
    messageTerminal(config)
  },
  // eslint-disable-next-line consistent-return
  router: req => {
    if (req && req.url) {
      const parseURL = parse(req.url)
      if (parseURL && parseURL.pathname) {
        const ticket = parseURL.pathname.split('/')[3]
        writeInLogger(ticket, 'path to vmrc token: %s')
        try {
          const esxi = readFileSync(
            `${global.paths.VMRC_TOKENS || ''}/${ticket}`
          ).toString()
          return esxi
        } catch (error) {
          writeInLogger(ticket, 'Error to read vmrc token file: %s')
        }
      }
    }
  }
})

/**
 * VMRC Proxy.
 *
 * @param {object} appServer - express app
 */
const vmrc = appServer => {
  if (
    appServer &&
    appServer.on &&
    appServer.constructor &&
    appServer.constructor.name &&
    appServer.constructor.name === 'Server'
  ) {
    appServer.on('upgrade', vmrcProxy.upgrade)
  }
}

module.exports = {
  vmrc
}
