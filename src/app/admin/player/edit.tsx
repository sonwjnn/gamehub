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
        <ReferenceInput source="userId" reference="users" />
        <ReferenceInput source="tableId" reference="tables" />
      </SimpleForm>
    </Edit>
  )
}
