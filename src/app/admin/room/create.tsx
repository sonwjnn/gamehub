import {
  SimpleForm,
  Create,
  TextInput,
  required,
  ReferenceInput,
  NumberInput,
  SelectInput,
} from 'react-admin'

export const RoomCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} label="Name" />
        <NumberInput source="min" validate={[required()]} label="Min" />
        <NumberInput source="max" validate={[required()]} label="Max" />
        <ReferenceInput source="userId" reference="users" />
        <SelectInput
          source="status"
          choices={[
            { id: 'active', name: 'active' },
            { id: 'inactive', name: 'inactive' },
          ]}
          validate={[required()]}
          label="Status"
        />
      </SimpleForm>
    </Create>
  )
}
