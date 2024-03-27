import { SimpleForm, Edit, TextInput, required, SelectInput } from 'react-admin'

export const UserEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="Id" disabled />
        <TextInput
          source="username"
          validate={[required()]}
          label="User name"
          disabled
        />
        <TextInput source="name" validate={[required()]} label="Name" />
        <TextInput source="email" validate={[required()]} label="Email" />
        <SelectInput
          source="role"
          choices={[
            {
              id: 'ADMIN',
              name: 'ADMIN',
            },
            {
              id: 'USER',
              name: 'USER',
            },
          ]}
          validate={[required()]}
          label="Role"
        />
      </SimpleForm>
    </Edit>
  )
}
