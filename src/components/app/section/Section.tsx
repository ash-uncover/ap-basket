import React, { useDebugValue } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useMatch, useNavigate } from 'react-router-dom'
import { useSection, useSectionMembers, useSectionUsers } from 'lib/helpers/hooks/sections.hooks'

import AuthSelectors from 'store/auth/auth.selectors'

import { getUserFullName } from 'lib/utils/entities/users.utils'
import { getSectionAdmins, getSectionInitials } from 'lib/utils/entities/sections.utils'

import DataStates from '@uncover/js-utils/dist/DataStates'
import { mergeDataStates } from '@uncover/js-utils/dist/DataStatesUtils'

import {
  Breadcrumb,
  BreadcrumbItem,
  BusyIndicator,
  BusyIndicatorSizes,
  Button,
  ButtonDesigns,
  Page,
  PageHeader,
  PageBody,
  IconTabBar,
  Title,
  TitleLevels,
} from '@uncover/fundamentals-react'

import './Section.css'
import AppSlice from 'store/app/app.slice'
import { Dialog } from '../dialogs/Dialogs'
import AppSelectors from 'store/app/app.selectors'

const SECTION_TAB = {
  GENERAL: {
    id: 'general',
    title: 'app.section.tabs.general.title'
  },
  SESSIONS: {
    id: 'sessions',
    title: 'app.section.tabs.sessions.title'
  },
  MEMBERS: {
    id: 'members',
    title: 'app.section.tabs.members.title'
  },
}
const SECTION_TABS = Object.values(SECTION_TAB)

const Section = ({ sectionId, children }) => {

  // Hooks //

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const expanded = useSelector(AppSelectors.pageExpanded)
  const match = useMatch('/sections/:sectionId/:tabId')

  const userId = useSelector(AuthSelectors.userId)

  const section = useSection(sectionId)
  const members = useSectionMembers(sectionId)
  const users = useSectionUsers(sectionId)

  const status = mergeDataStates([section.dataStatus, members.status, users.status])

  // Events//

  const handleHeaderExpand = (expand) => {
    dispatch(AppSlice.actions.setPageExpanded(expand))
  }

  const handleEditSection = () => {
    dispatch(AppSlice.actions.openDialog({
      dialog: Dialog.SECTION_EDIT,
      params: { sectionId }
    }))
  }

  const onTabSelect = (tabId) => {
    navigate(`/sections/${sectionId}/${tabId}`)
  }

  // Rendering //

  switch (status) {
    case DataStates.NEVER:
    case DataStates.FETCHING:
    case DataStates.FETCHING_FIRST: {
      return (
        <BusyIndicator size={BusyIndicatorSizes.LARGE} />
      )
    }
    case DataStates.FAILURE: {
      return (
        <div>error</div>
      )
    }
    default: {
      const adminsData = getSectionAdmins(members.data, users.data, userId)
      const isAdmin = adminsData.some(admin => admin.isSelf)
      const tabTitle = t((SECTION_TABS.find(tab => tab.id === match?.params.tabId) || SECTION_TAB.GENERAL)?.title)
      const buildBreadcrumbsItems = () => {
        const items: BreadcrumbItem[] = [
          { text: 'Sections', onItemSelected: () => navigate('/sections') },
          { text: section.data.name, onItemSelected: () => navigate(`/sections/${sectionId}`) },
        ]
        if (match?.params.tabId && (match?.params.tabId !== SECTION_TAB.GENERAL.id)) {
          items.push({ text: tabTitle })
        }
        return items
      }
      return (
        <Page className='app-content'>
          <PageHeader
            hideBoxShadow
            expanded={expanded}
            onExpand={handleHeaderExpand}
            breadcrumb={(
              <Breadcrumb
                ariaLabel='breadcrumb'
                items={buildBreadcrumbsItems()}
              />
            )}
            avatar={{
              initials: getSectionInitials(section.data)
            }}
            title={t('app.section.title', { name: section.data.name })}
            subtitle={section.data.description}
            actions={[
              isAdmin ? <Button
                ariaLabel={t('app.section.actions.edit')}
                design={ButtonDesigns.EMPHASIZED}
                compact
                icon='edit-outside'
                onClick={handleEditSection}
              /> : null,
              <Button
                ariaLabel={t('app.section.actions.leave')}
                compact
                icon='action'
              />,
            ]}
            attributes={[{
              label: t('app.section.attributes.administrators'),
              text: adminsData.map(getUserFullName).join(', '),
              type: 'text',
            }]}
          >
          </PageHeader>

          <PageBody>
            <IconTabBar
              selectedTab={match?.params.tabId || SECTION_TAB.GENERAL.id}
              tabs={SECTION_TABS.map(tab => ({
                ...tab,
                title: t(tab.title)
              }))}
              onTabSelect={onTabSelect}
            />
            <Title className='section-title' level={TitleLevels.H2}>
              {tabTitle}
            </Title>
            {children}
          </PageBody>

        </Page>
      )
    }
  }
}

export default Section
