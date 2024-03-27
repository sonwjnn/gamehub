import { SimpleForm, Create, TextInput, required } from 'react-admin'

export const RoomCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} label="Name" />
        <TextInput source="min" validate={[required()]} label="Min" />
        <TextInput source="max" validate={[required()]} label="Max" />
        <TextInput source="status" validate={[required()]} label="Status" />
      </SimpleForm>
    </Create>
  )
}
