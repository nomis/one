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
import * as React from 'react'

import { Container, Box } from '@material-ui/core'

import { ImagesTable } from 'client/components/Tables'
import Detail from 'client/components/Tables/Images/detail'
import SplitPane from 'client/components/SplitPane'

function Images () {
  const [selectedRows, onSelectedRowsChange] = React.useState()

  const selectedRowIds = React.useMemo(
    () => selectedRows?.map(row => row.id),
    [selectedRows]
  )

  return (
    <Box
      height={1}
      py={2}
      overflow='auto'
      display='flex'
      flexDirection='column'
      component={Container}
    >
      <SplitPane>
        <ImagesTable onSelectedRowsChange={onSelectedRowsChange} />

        {selectedRows?.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            {selectedRows?.length === 1
              ? <Detail id={selectedRows[0]?.values.ID} />
              : (
                <pre>
                  <code>
                    {JSON.stringify(Object.keys(selectedRowIds)?.join(', '), null, 2)}
                  </code>
                </pre>
              )
            }
          </div>
        )}
      </SplitPane>
    </Box>
  )
}

export default Images
