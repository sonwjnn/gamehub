import { Layout } from 'react-admin';
import { AdminMenu } from './adminMenu';

export const AdminLayout = (props) => {
  return <Layout {...props} menu={AdminMenu} />
};