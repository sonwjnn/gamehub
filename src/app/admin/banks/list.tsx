import { Datagrid, DateField, List, NumberField, SelectField, TextField } from 'react-admin'


const bankStatusChoices = [
  { id: 'active', name: 'active' },
  { id: 'inactive', name: 'inactive' },
];

const renderNumberField = (source: string | undefined) => <NumberField source={source} />;

export const BanksList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        {/*<TextField source="id" />*/}
        <TextField source="user_id" />
        <TextField source="number1" />
        <TextField source="number2" />
        <TextField source="branch" />
        <TextField source="username" />
        <TextField source="bankcode" />
        <DateField label="created" source="createdAt" />
        <SelectField source="status" choices={bankStatusChoices} />
      </Datagrid>
    </List>
  );
};
