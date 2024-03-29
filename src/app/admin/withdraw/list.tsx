import {
  Datagrid,
  List,
  NumberField,
  SelectField,
  TextField,
} from 'react-admin'

export const WithdrawList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="prize" />
        <NumberField source="min" />
        <NumberField source="max" />
        <SelectField
          source="status"
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
        <TextField source="rooms" />
        <TextField source="start" />
        <TextField source="end" />
        <TextField source="email" />
      </Datagrid>
    </List>
  )
}
