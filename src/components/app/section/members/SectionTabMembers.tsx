import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import AuthSelectors from 'store/auth/auth.selectors'

import { useSectionMembers, useSectionUsers } from 'lib/helpers/hooks/sections.hooks'

import { BusyIndicator } from 'fundamental-react'

import DataStates, { mergeDataStates } from 'lib/constants/DataStates'

import './SectionTabMembers.css'
import { Table } from '@uncover/fundamentals-react'

const SectionTabMembers = ({ sectionId }) => {

  // Hooks //

  const { t } = useTranslation()

  const userId = useSelector(AuthSelectors.userId)
  const members = useSectionMembers(sectionId)
  const users = useSectionUsers(sectionId)
  const status = mergeDataStates([members.status, users.status])

  // Rendering //

  switch (status) {
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
      const userData = users.data
        .map((user) => {
          const member = members.data?.find(member => member.data.userId === user.data.id)
          return {
            ...member.data,
            ...user.data,
            isAdmin: member.data.roles?.includes('sectionAdmin'),
            isSelf: userId === user.data.id
          }
        }).sort((user1, user2) => {
          return user1.firstName.localeCompare(user2.firstName)
        })
      return (
        <Table
          borderedVertical={true}
          indicator
          columns={[{
            key: 'firstName',
            name: t('entities.user.firstName'),
            formatter: (user) => user.isSelf ? <strong>{user.firstName}</strong> : user.firstName
          }, {
            key: 'lastName',
            name: t('entities.user.lastName'),
            formatter: (user) => user.isSelf ? <strong>{user.lastName}</strong> : user.lastName
          }, {
            key: 'email',
            name: t('entities.user.email'),
            formatter: (user) => user.isSelf ? <strong>{user.email}</strong> : user.email
          }, {
            key: 'isAdmin',
            name: t('entities.member.roles'),
            render: (user) => <span>{user.isAdmin ? 'admin' : ''}</span>
          }]}
          rows={userData.map(user => ({
            data: user,
            indicator: user.isSelf ? 'information' : null
          }))}
        />
      )
    }
  }
}

export default SectionTabMembers
