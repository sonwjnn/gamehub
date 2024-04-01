import {
  Datagrid,
  List,
  NumberField,
  SelectField,
  TextField,
} from 'react-admin'

export const RechargeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        {/*<TextField source="id" />*/}
        <TextField source="userId" />
        <TextField source="amount" />
        <TextField source="number1" />
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
