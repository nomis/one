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
import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'
import { Container, Box } from '@material-ui/core'

import { PATH } from 'client/apps/sunstone/routesFlow'
import { useFetch } from 'client/hooks'
import { useApplicationTemplate, useApplicationTemplateApi } from 'client/features/One'

import DeployForm from 'client/containers/ApplicationsTemplates/Form/Deploy'
import { ListHeader, ListCards } from 'client/components/List'
import AlertError from 'client/components/Alerts/Error'
import { ApplicationTemplateCard } from 'client/components/Cards'
import { T } from 'client/constants'

function ApplicationsTemplates () {
  const history = useHistory()
  const [showDialog, setShowDialog] = useState(false)

  const applicationsTemplates = useApplicationTemplate()
  const { getApplicationsTemplates } = useApplicationTemplateApi()

  const { error, fetchRequest, loading, reloading } = useFetch(getApplicationsTemplates)

  useEffect(() => { fetchRequest() }, [])

  return (
    <Container disableGutters>
      <ListHeader
        title={T.ApplicationsTemplates}
        hasReloadButton
        reloadButtonProps={{
          'data-cy': 'refresh-application-template-list',
          onClick: () => fetchRequest(undefined, { reload: true, delay: 500 }),
          isSubmitting: Boolean(loading || reloading)
        }}
        addButtonProps={{
          'data-cy': 'create-application-template',
          onClick: () => history.push(PATH.APPLICATIONS_TEMPLATES.CREATE)
        }}
      />
      <Box p={3}>
        {error ? (
          <AlertError>{T.CannotConnectOneFlow}</AlertError>
        ) : (
          <ListCards
            list={applicationsTemplates}
            isLoading={applicationsTemplates?.length === 0 && loading}
            gridProps={{ 'data-cy': 'applications-templates' }}
            CardComponent={ApplicationTemplateCard}
            cardsProps={({ value }) => ({
              handleEdit: () => history.push(
                PATH.APPLICATIONS_TEMPLATES.EDIT.replace(':id', value?.ID)
              ),
              handleDeploy: () => setShowDialog(value),
              handleRemove: undefined // TODO
            })}
          />
        )}
      </Box>
      {showDialog !== false && (
        <DeployForm
          applicationTemplate={showDialog}
          handleCancel={() => setShowDialog(false)}
        />
      )}
    </Container>
  )
}

export default ApplicationsTemplates
