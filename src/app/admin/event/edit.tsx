import { SimpleForm, Edit, TextInput, required, SelectInput, TextField, SelectField, NumberField } from 'react-admin'


const eventStatusChoices = [
  { id: 'active', name: 'active' },
  { id: 'inactive', name: 'inactive' },
];

const renderNumberField = (source: string | undefined) => <NumberField source={source} />;

export const EventsEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="name" />
        <TextInput source="prize" />
        <TextInput source="min" />
        <TextInput source="max" />
        <SelectInput source="status" choices={eventStatusChoices} key={'status'}/>
      </SimpleForm>
    </Edit>
  )
}
