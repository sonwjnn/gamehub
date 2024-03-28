import { SimpleForm, Edit, TextInput, required, SelectInput, TextField, SelectField } from 'react-admin'

const messageStatusChoices = [
  { id: 'active', name: 'active' },
  { id: 'inactive', name: 'inactive' },
]


export const MessageEdit = () => {
  return (
    <Edit>

      <SimpleForm>
        <div className="col-6">
          <TextInput source="id" />
          <TextInput source="name" />
          <TextInput source="prize" />
          <TextInput source="min" />
          <TextInput source="max" />
        </div>
        <div className="col-6">
          <SelectInput source="status" choices={messageStatusChoices} key={'status'} />
          <TextInput source="rooms" />
          <TextInput source="start" />
          <TextInput source="end" />
          <TextField source="email" />
        </div>
      </SimpleForm>
    </Edit>
)
}
