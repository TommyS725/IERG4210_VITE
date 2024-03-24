
/**
 * for cookies having same key, use the first one
 * if not found, return empty string
 * @param key 
 * @returns 
 */
export function getCookieByKey(key: string): string  {
  const cookie = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith(`${key}=`))
  return  cookie?.split('=')[1] ?? ""
}

export function getCsrfToken() {
  return getCookieByKey("csrf")
}