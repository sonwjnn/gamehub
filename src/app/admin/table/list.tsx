import { Datagrid, List, NumberField, TextField } from 'react-admin'

export const TableList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="user.id" label="Owner" />
        <NumberField source="minBuyIn" label="Min Buy-in" />
        <NumberField source="maxBuyIn" label="Max Buy-in" />
        <NumberField source="maxPlayers" />
      </Datagrid>
    </List>
  )
}
