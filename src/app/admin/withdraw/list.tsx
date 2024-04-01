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
        {/*<TextField source="id" />*/}
        <TextField source="userId" />
        <TextField source="cardName" />
        <TextField source="cardCode" />
        <TextField source="comment" disabled />
        <NumberField source="amount" />
        <SelectField
          source="status"
          choices={[
            {
              id: 'active',
              name: 'active',
            },
            {
              id: 'inactive',
              name: 'inactive',
            },
          ]}
        />
      </Datagrid>
    </List>
  )
}
