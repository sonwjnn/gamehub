import { Datagrid, List, SelectField, TextField } from 'react-admin'

export const UserList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="username" />
        <TextField source="name" />
        <TextField source="email" />

        <SelectField
          source="role"
          choices={[
            {
              id: 'ADMIN',
              name: 'ADMIN',
            },
            {
              id: 'USER',
              name: 'USER',
            },
          ]}
        />
      </Datagrid>
    </List>
  )
}
