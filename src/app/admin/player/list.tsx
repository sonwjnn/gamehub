import { Datagrid, List, NumberField, TextField } from 'react-admin'

export const PlayerList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="user.username" label="User name" />
        <TextField source="table.name" label="Table name" />
        <NumberField source="bankroll" />
      </Datagrid>
    </List>
  )
}
