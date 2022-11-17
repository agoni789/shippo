import { IPermissionAccess } from '@shippo/types'
import { createAPI } from '../helpers'

interface IResponseResource
  extends Array<IPermissionAccess & { roleAssociationCount: number }> {}

export const find_all = createAPI<void, IResponseResource>({
  url: '/permissionAccess/findAll',
  method: 'POST',
})
