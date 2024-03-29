import { Datagrid, List, NumberField, TextField } from 'react-admin'

export const TableList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="user.id" label="Owner" />
        <NumberField source="limit" />
        <NumberField source="minBet" />
        <NumberField source="minRaise" />
        <NumberField source="maxPlayers" />
      </Datagrid>
    </List>
  )
}
