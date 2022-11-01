import { IUserInfo } from '@shippo/types'
import { createAPI } from '../helpers'

interface IRequestResource {
  wxCode?: string
}

interface IResponseResource extends IUserInfo {}

export const create = createAPI<IRequestResource, IResponseResource>({
  url: '/passport/create',
  method: 'POST',
})
