import {
  SimpleForm,
  Create,
  TextInput,
  required,
  SelectInput,
} from 'react-admin'

export const UserCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="username"
          validate={[required()]}
          label="User name"
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
    </Create>
  )
}
