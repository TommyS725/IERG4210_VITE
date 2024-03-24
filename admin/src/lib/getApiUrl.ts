const API_VERSION = 'v1' as const



export default function getApiUrl(path: string, pathParams?: string) {
  const tar = "/" + `api/${API_VERSION}/${path}/${pathParams ?? ''}`
    .split('/')
    .filter((s) => s !== '')
    .join('/')
  // console.log('getApiUrl', tar)
  return tar
}
