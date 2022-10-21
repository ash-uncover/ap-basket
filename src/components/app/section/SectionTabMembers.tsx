import React from 'react'
import { useSectionMembers } from 'lib/helpers/sections.helper'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { useUser } from 'lib/helpers/users.helper'

import AuthSelectors from 'store/auth/auth.selectors'

import {
  BusyIndicator,
} from 'fundamental-react'
import {
  Table,
  TableRow,
  TableCell
} from 'components/fiori/table/Table'

import DataStates from 'lib/constants/DataStates'

import './SectionTabMembers.css'

const SectionTabMembers = ({ sectionId }) => {

  // Hooks //

  const { t } = useTranslation()

  const members = useSectionMembers(sectionId)

  // Rendering //

  switch (members.status) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <BusyIndicator show size='l' />
      )
    }
    case DataStates.FAILURE: {
      return (
        <div>error</div>
      )
    }
    default: {
      return (
        <div className=''>
          <Table
            borderedVertical={true}
            columns={[
              { key: 'indicator', type: 'status-indicator' },
              { key: 'firstName', name: 'First Name' },
              { key: 'lastName', name: 'Last Name' },
              { key: 'email', name: 'Email' },
            ]}
          >
            {members.data.map((member) => (
              <SectionMember
                key={member.data.id}
                id={member.data.userId}
              />
            ))}
          </Table>
        </div>
      )
    }
  }
}

const SectionMember = ({ id }) => {

  // Hooks //

  const { t } = useTranslation()

  const user = useUser(id)
  const userId = useSelector(AuthSelectors.userId)

  const isCurrentUser = userId === id

  // Rendering //

  switch (user.dataStatus) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <TableRow>
          <TableCell>
            <BusyIndicator show size='l' />
          </TableCell>
        </TableRow>
      )
    }
    case DataStates.FAILURE: {
      return (
        <TableRow>
          <TableCell>
            <span>error</span>
          </TableCell>
        </TableRow>
      )
    }
    default: {
      return (
        <TableRow>
          <TableCell
            type='status-indicator'
            indicator={isCurrentUser ? 'information' : null}
          />
          <TableCell>
            {isCurrentUser ?
              <strong>
                {user.data.firstName}
              </strong>
              :
              <span>
                {user.data.firstName}
              </span>
            }
          </TableCell>
          <TableCell>
            {isCurrentUser ?
              <strong>
                {user.data.lastName}
              </strong>
              :
              <span>
                {user.data.lastName}
              </span>
            }
          </TableCell>
          <TableCell>
            {isCurrentUser ?
              <strong>
                {user.data.email}
              </strong>
              :
              <span>
                {user.data.email}
              </span>
            }
          </TableCell>
        </TableRow>
      )
    }
  }
}

export default SectionTabMembers
