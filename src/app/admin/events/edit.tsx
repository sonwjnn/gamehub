import { SimpleForm, Edit, TextInput, required, SelectInput, TextField, SelectField, NumberField } from 'react-admin'
import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'

const eventStatusChoices = [
  { id: 'active', name: 'active' },
  { id: 'inactive', name: 'inactive' },
]

const renderNumberField = (source: string | undefined) => <NumberField source={source} />

export const EventsEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <Box  sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <TextInput source="id" readOnly fullWidth />
              <TextInput source="name" fullWidth />
              <TextInput source="prize" fullWidth />
            </Grid>
            <Grid xs={6}>
              <TextInput source="min" fullWidth />
              <TextInput source="max" fullWidth />
              <SelectInput source="status" choices={eventStatusChoices} key={'status'} fullWidth />
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Edit>
  )
}
