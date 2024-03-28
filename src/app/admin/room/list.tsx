import {
  Datagrid,
  List,
  NumberField,
  SelectField,
  TextField,
  TextInput,
} from 'react-admin'

const roomStatusChoices = [
  { id: 'ACTIVE', name: 'ACTIVE' },
  { id: 'INACTIVE', name: 'INACTIVE' },
]

const createRoomFilters = () => [
  <TextInput label="Search" source="q" alwaysOn key="username" />,
  <TextInput source="min" key="min" name="min" />,
  <TextInput source="max" key="max" name="max" />,
]

export const RoomList = () => {
  const roomFilters = createRoomFilters()

  return (
    <List filters={roomFilters}>
      <Datagrid rowClick="edit" id="room">
        <TextField source="id" />
        <TextField source="name" />
        <NumberField source="min" />
        <NumberField source="max" />
        <SelectField source="status" choices={roomStatusChoices} key="status" />
      </Datagrid>
    </List>
  )
}
