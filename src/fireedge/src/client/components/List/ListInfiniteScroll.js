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
import React, { useRef, useEffect, useCallback, createRef } from 'react'
import PropTypes from 'prop-types'

import { debounce, LinearProgress } from '@material-ui/core'
import { useList, useNearScreen } from 'client/hooks'

const ListInfiniteScroll = ({ list, renderResult }) => {
  const gridRef = createRef()
  const { loading, shortList, finish, reset, setLength } = useList({
    list,
    initLength: 50
  })

  const loaderRef = useRef()
  const { isNearScreen } = useNearScreen({
    distance: '100px',
    externalRef: loading ? null : loaderRef,
    once: false
  })

  useEffect(() => {
    reset(list)
    gridRef.current.scrollIntoView({ block: 'start' })
  }, [list])

  const debounceHandleNextPage = useCallback(
    debounce(() => setLength(prevLength => prevLength + 20), 200),
    [setLength]
  )

  useEffect(() => {
    if (isNearScreen && !finish) debounceHandleNextPage()
  }, [isNearScreen, finish, debounceHandleNextPage])

  return (
    <div style={{ overflowY: 'auto', padding: 10 }}>
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridGap: 10
        }}
      >
        {shortList?.map(renderResult)}
      </div>
      {!finish && (
        <LinearProgress
          ref={loaderRef}
          color='secondary'
          style={{ width: '100%', marginTop: 10 }}
        />
      )}
    </div>
  )
}

ListInfiniteScroll.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  renderResult: PropTypes.func
}

ListInfiniteScroll.defaultProps = {
  list: [],
  renderResult: () => null
}

export default ListInfiniteScroll
