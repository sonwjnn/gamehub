import {
  SimpleForm,
  Edit,
  TextInput,
  required,
  ReferenceInput,
} from 'react-admin'

export const PlayerEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} label="Name" />
        <ReferenceInput source="userId" reference="users" />
        <ReferenceInput source="tableId" reference="tables" />
      </SimpleForm>
    </Edit>
  )
}
