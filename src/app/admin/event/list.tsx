import {
  Datagrid,
  List,
  NumberField,
  SelectField,
  TextField,
} from 'react-admin'

const eventStatusChoices = [
  { id: 'active', name: 'active' },
  { id: 'inactive', name: 'inactive' },
]

const renderNumberField = (source: string | undefined) => (
  <NumberField source={source} />
)

export const EventsList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="prize" />
        {renderNumberField('min')}
        {renderNumberField('max')}
        <SelectField source="status" choices={eventStatusChoices} />
      </Datagrid>
    </List>
  )
}
