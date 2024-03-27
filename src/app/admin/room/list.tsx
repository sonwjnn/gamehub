import {
  Datagrid,
  List,
  NumberField,
  SelectField,
  TextField,
} from 'react-admin'

export const RoomList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <NumberField source="min" />
        <NumberField source="max" />
        <SelectField
          source="status"
          choices={[
            {
              id: 'ACTIVE',
              name: 'ACTIVE',
            },
            {
              id: 'INACTIVE',
              name: 'INACTIVE',
            },
          ]}
        />
      </Datagrid>
    </List>
  )
}
