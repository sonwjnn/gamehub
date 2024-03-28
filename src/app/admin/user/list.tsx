import { Datagrid, List, SelectField, TextField, TextInput, DateField } from 'react-admin';

const userRoleChoices = [
  { id: 'ADMIN', name: 'ADMIN' },
  { id: 'USER', name: 'USER' },
];

const createUserFilters = () => [
  <TextInput key="search-username" label="Search" source="q" alwaysOn name={'username'} />,
  <TextInput key="search-email" source="email"  name={'email'} />,
];

export const UserList = () => {
  const userFilters = createUserFilters();

  return (
    <List filters={userFilters}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="username" />
        <TextField source="name" />
        <TextField source="email" />
        <SelectField source="role" choices={userRoleChoices} key={'role'}/>
        <DateField label="created" source="createdAt" />
      </Datagrid>
    </List>
  );
};
