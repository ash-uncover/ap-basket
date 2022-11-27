import { StringUtils } from "@uncover/js-utils"

export type USER = {
  firstName: string,
  lastName: string,
  email: string,
  roles: string[],
}

export const sortUsers = (user1, user2) => {
  return user1.firstName.localeCompare(user2.firstName)
}

export const getUserFullName = (user) => {
  return `${user.firstName} ${user.lastName}`
}

export const getUserInitials = (user) => {
  return `${StringUtils.capitalizeFirst(user.firstName)}${StringUtils.capitalizeFirst(user.lastName)}`
}