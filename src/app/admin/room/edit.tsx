import { SimpleForm, Edit, TextInput, required } from 'react-admin'

export const RoomEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="Id" />
        <TextInput source="name" validate={[required()]} label="Name" />
      </SimpleForm>
    </Edit>
  )
}
