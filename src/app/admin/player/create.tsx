import {
  SimpleForm,
  Create,
  TextInput,
  required,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin'

export const PlayerCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <ReferenceInput source="userId" reference="users">
          <SelectInput optionText="username" />
        </ReferenceInput>
        <ReferenceInput source="tableId" reference="tables" />
      </SimpleForm>
    </Create>
  )
}
