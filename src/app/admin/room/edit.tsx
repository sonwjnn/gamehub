import {
  SimpleForm,
  Edit,
  TextInput,
  required,
  NumberField,
  SelectInput,
} from 'react-admin'

export const RoomEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" validate={[required()]} label="Id" />
        <TextInput source="name" validate={[required()]} label="Name" />
        <NumberField source="min" validate={[required()]} label="Min" />
        <NumberField source="max" validate={[required()]} label="Max" />
        <SelectInput
          source="status"
          choices={[
            {
              id: 'ACTIVE',
              name: 'ACTIVE',
            },
            {
              id: 'INACTIVE',
              name: 'INACTIVE',
            },
          ]}
          validate={[required()]}
          label="Status"
        />
      </SimpleForm>
    </Edit>
  )
}
