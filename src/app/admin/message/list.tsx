import { Datagrid, List, NumberField, SelectField, TextField } from 'react-admin'


const messageStatusChoices = [
  { id: 'active', name: 'active' },
  { id: 'inactive', name: 'inactive' },
]

export const MessageList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="prize" />
        <TextField source="min" />
        <TextField source="max" />
        <SelectField source="status" choices={messageStatusChoices} key={'status'} />
        <TextField source="rooms" />
        <TextField source="start" />
        <TextField source="end" />
        <TextField source="email" />
      </Datagrid>
    </List>
  )
}
