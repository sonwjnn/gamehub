import { useCurrentUser } from '@/hooks/use-current-user'
import { SimpleForm, Edit, TextInput, required, NumberInput } from 'react-admin'

export const TableEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} label="Name" />
        <NumberInput source="limit" validate={[required()]} label="Limit" />
        <TextInput
          source="userId"
          validate={[required()]}
          style={{ display: 'none' }}
        />
      </SimpleForm>
    </Edit>
  )
}
