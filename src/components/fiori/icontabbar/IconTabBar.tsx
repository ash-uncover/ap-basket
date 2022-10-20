import React, { ReactElement } from 'react'
import { IconTabBarItem, IconTabBarItemProperties } from './IconTabBarItem'

export type IconTabBarProperties = {
  selectedTab?: string
  tabs?: IconTabBarItemProperties[],
  children?: ReactElement | ReactElement[]
  onTabSelect?: (id: string) => void
}
export const IconTabBar = ({
  selectedTab,
  tabs,
  onTabSelect,
  children,
}: IconTabBarProperties) => {

  // Rendering //

  const classes = ['fd-icon-tab-bar']

  return (
    <div className={classes.join(' ')}>
      <ul
        className='fd-icon-tab-bar__header'
        role='tablist'
      >
        {tabs?.map(tab => {
          return (
            <IconTabBarItem
              key={tab.id}
              selected={selectedTab === tab.id}
              {...tab}
              onTabSelect={onTabSelect}
            />
          )
        })}
        {children}
      </ul>
    </div>
  )
}
