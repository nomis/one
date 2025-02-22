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

const jwt = require('jwt-simple')
const { messageTerminal } = require('./general')
const speakeasy = require('speakeasy')

/**
 * Create a JWT.
 *
 * @param {object} param0 - object of data to JWT {ID, USER, Opennebula_token}
 * @param {string} param0.id - user ID
 * @param {string} param0.user - username
 * @param {string} param0.token - token opennebula
 * @param {number} iat - epoch create time (now)
 * @param {number} exp - epoch expire time
 * @returns {string} JWT
 */
const createJWT = (
  { id: iss, user: aud, token: jti },
  iat = '',
  exp = ''
) => {
  let rtn = null
  if (iss && aud && jti && iat && exp && global && global.paths && global.paths.FIREEDGE_KEY) {
    const payload = {
      iss,
      aud,
      jti,
      iat,
      exp
    }
    rtn = jwt.encode(payload, global.paths.FIREEDGE_KEY)
  }
  return rtn
}

/**
 * Validate auth (JWT).
 *
 * @param {object} req - http request
 * @returns {object} return data of JWT
 */
const validateAuth = (req = {}) => {
  let rtn = false
  if (req && req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization
    const removeBearer = /^Bearer /i
    const token = authorization.replace(removeBearer, '')
    const fireedgeKey = global && global.paths && global.paths.FIREEDGE_KEY
    if (token && fireedgeKey) {
      try {
        const payload = jwt.decode(token, fireedgeKey)
        if (
          payload &&
          'iss' in payload &&
          'aud' in payload &&
          'jti' in payload &&
          'iat' in payload &&
          'exp' in payload
        ) {
          const { iss, aud, jti, iat, exp } = payload
          rtn = {
            iss,
            aud,
            jti,
            iat,
            exp
          }
        }
      } catch (error) {
      }
    } else {
      const messageError = (!token && 'jwt') || (!fireedgeKey && 'fireedge_key')
      if (messageError) {
        messageTerminal({
          color: 'red',
          message: 'invalid: %s',
          error: messageError
        })
      }
    }
  }
  return rtn
}

/**
 * Check 2FA.
 *
 * @param {string} secret - secret key
 * @param {string} token - token JWT
 * @returns {string} data decoded
 */
const check2Fa = (secret = '', token = '') => {
  let rtn = false
  if (secret && token) {
    rtn = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token
    })
  }
  return rtn
}

module.exports = {
  createJWT,
  validateAuth,
  check2Fa
}
