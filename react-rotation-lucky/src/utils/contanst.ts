import axios from 'axios'
import qs from 'qs'
import AdmZip from 'adm-zip'
import arrayBufferToBuffer from 'arraybuffer-to-buffer'

const request = axios.create()
const api = (
  options: any,
  arrayFormat?: 'comma' | 'indices' | 'brackets' | 'repeat' | undefined,
  accessToken?: string,
  url?: string
) => {
  if (!options.noAuthentication) {
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      }
    } else {
      return null
    }
  }
  options.headers = {
    ...options.headers,
    ['Client-Key']: process.env.NEXT_PUBLIC_APPLICATION_CLIENT_KEY,
    'Accept-Language': 'vi'
  }
  return request({
    baseURL: url,
    ...options,
    paramsSerializer: (params: any) =>
      qs.stringify(params, { arrayFormat: arrayFormat || 'comma' }),
    headers: {
      ...options.headers
    }
  })
}

export default api

export async function get(url: string) {
  const { data } = await axios.get(url, {
    responseType: 'arraybuffer'
  })
  return data
}
export const convertUint8ArrayToBuffer = (array: BlobPart) => {
  return URL.createObjectURL(new Blob([array], { type: 'image/png' }))
}

export async function getAndUnZip(url: string) {
  const zipFileBuffer = await get(url)
  const buffer: any = arrayBufferToBuffer(zipFileBuffer)
  const zip = new AdmZip(buffer)
  const entries = zip.getEntries()
  const zipFiles: any = []
  for (const zipEntry of entries) {
    zipFiles.push({
      src: convertUint8ArrayToBuffer(zipEntry.getData()),
      name: zipEntry.entryName
    })
  }
  return zipFiles
}
