import { sortUsers } from "./users.utils"

export interface SECTION {
  name: string
}

export const getSectionInitials = (section) => {
  return section.name.substring(0, 2).toUpperCase()
}

export const getSectionUsers = (members, users, userId) => {
  const userData = users
    .map((user) => {
      const member = members?.find(member => member.data.userId === user.data.id)
      return {
        ...member.data,
        ...user.data,
        isAdmin: member.data.roles?.includes('sectionAdmin'),
        isSelf: userId === user.data.id
      }
    }).sort(sortUsers)
  return userData
}

export const getSectionAdmins = (members, users, userId?) => {
  return getSectionUsers(members, users, userId).filter(user => user.isAdmin)
}