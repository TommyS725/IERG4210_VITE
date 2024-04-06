export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export function setTitle(title: string) {
  document.title = title
}

/**
 * if the cookie is not found, return an empty string
 * for cookies having the same name, the first one is returned
 * @param key
 * @returns
 */
export function getCookie(key: string) {
  const cookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith(`${key}=`))
  return cookie ? cookie.split('=')[1] : ''
}

export function getCsrfToken() {
  return getCookie('csrf')
}

export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start }, (_, i) => start + i)
}
