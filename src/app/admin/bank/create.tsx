import {
  SimpleForm,
  Create,
  TextInput,
  required,
  SelectInput, TextField, SelectField, NumberField,
} from 'react-admin'

const bankStatusChoices = [
  { id: 'ADMIN', name: 'ADMIN' },
  { id: 'USER', name: 'USER' },
];

const renderNumberField = (source: string | undefined) => <NumberField source={source} />;


export const BanksCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextField source="name" />
        <TextField source="prize" />
        {renderNumberField("min")}
        {renderNumberField("max")}
        <SelectField source="status" choices={bankStatusChoices} />
        <TextField source="rooms" />
        <TextField source="start" />
        <TextField source="end" />
        <TextField source="email" />
      </SimpleForm>
    </Create>
  )
}
