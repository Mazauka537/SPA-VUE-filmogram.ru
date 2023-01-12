import { ref } from 'vue'

export default function useRequestMaker() {
  const isFetching = ref(false)

  const makeRequest = async (urn, method = 'GET', body = {}, availableResponseStatuses = [200]) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'X-API-KEY': '1a2a15cf-6efe-44a0-bb00-0cddec1829c3',
    }

    const fetchInit = {
      headers,
      method,
    }

    let fetchInput = 'http://127.0.0.1:8000/api/' + urn

    if (method === 'GET') {
      fetchInput += parseParamsToUrl(body)
    } else {
      fetchInit.body = JSON.stringify(body)
    }

    isFetching.value = true
    const response = await fetch(fetchInput, fetchInit)
    isFetching.value = false

    if (!availableResponseStatuses.includes(response.status)) {
      console.log('unavailable response status: ' + response.status, availableResponseStatuses)
    }

    return response
  }

  const parseParamsToUrl = (params) => {
    let result = ''
    for (let key in params) {
      result += key + '=' + params[key] + '&'
    }
    if (result.length > 0) {
      result = '?' + result
      result = result.substr(0, result.length - 1)
    }

    return result
  }

  return {
    isFetching,
    fetch: makeRequest
  }
}
