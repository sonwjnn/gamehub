import { Layout } from 'react-admin'
import { AdminMenu } from './menu'

export const AdminLayout = (props: any) => {
  return <Layout {...props} menu={AdminMenu} />
}
