import { useCurrentUser } from '@/hooks/use-current-user'
import {
  SimpleForm,
  Create,
  TextInput,
  required,
  NumberInput,
} from 'react-admin'

export const TableCreate = () => {
  const user = useCurrentUser()

  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" validate={[required()]} label="Name" />
        <NumberInput
          source="minBuyIn"
          validate={[required()]}
          label="Min Buy-in"
        />
        <NumberInput
          source="maxBuyIn"
          validate={[required()]}
          label="Max Buy-in"
        />
        <TextInput
          source="userId"
          validate={[required()]}
          defaultValue={user?.id}
          style={{ display: 'none' }}
        />
      </SimpleForm>
    </Create>
  )
}
