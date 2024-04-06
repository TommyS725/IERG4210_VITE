import { ref } from 'vue'
import getApiUrl from './getApiUrl'

type Config = {
  path: string
  pathParams?: string | ((formData: FormData) => string)
  preProcess?: (form: FormData) => FormData | false
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

const dataToString = async (response: Response) => {
  const isJson = response.headers.get('content-type')?.includes('application/json')
  if (!isJson) {
    return response.text()
  }
  const data = await response.json()
  return JSON.stringify(data, null, 2)
}

export default function useRequest(config: Config) {
  const isLoading = ref(false)
  const statusName = ref('')
  const message = ref('')
  const ok = ref(true)
  const onSubmit = async (e: Event) => {
    e.preventDefault()
    if (isLoading.value) return
    const form = e.target
    if (!(form instanceof HTMLFormElement)) {
      return
    }

    const data = new FormData(form)
    const { preProcess } = config
    const processedData = preProcess ? preProcess(data) : data
    if (processedData === false) return
    const pathParam =
      typeof config.pathParams === 'function' ? config.pathParams(data) : config.pathParams
    const url = getApiUrl(config.path, pathParam)
    message.value = ''

    try {
      isLoading.value = true
      const response = await fetch(url, {
        method: config.method,
        body: data
      })
      const statusText = response.statusText
      const statusCode = response.status
      // Unauthorized -> Redirect to login
      if (!response.ok && statusCode === 401) {
        window.location.href = '/login/'
      }
      ok.value = response.ok
      statusName.value = `${statusCode} ${statusText}`
      message.value = await dataToString(response)
    } catch (error: any) {
      ok.value = false
      const errorName = (error.name as string) ?? 'Unknown Error'
      const errorMessage = (error.message as string) ?? ''
      statusName.value = errorName
      message.value = errorMessage
    } finally {
     isLoading.value = false
     const card = document.getElementById('status-card')
     card?.scrollIntoView({ behavior: 'smooth' ,block: 'end'})
    }
    return false
  }

  return {
    isLoading,
    statusName,
    message,
    ok,
    onSubmit
  }
}
