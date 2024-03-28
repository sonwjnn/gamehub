import {
  SimpleForm,
  Edit,
  TextInput,
  required,
  NumberField,
  SelectInput,
} from 'react-admin'
import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'


export const RoomEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <TextInput source="id" readOnly fullWidth validate={[required()]} label="Id" />
              <TextInput source="min" fullWidth validate={[required()]} label="Min" />
              <TextInput source="max" fullWidth validate={[required()]} label="Max" />
            </Grid>
            <Grid xs={6}>
              <TextInput source="name" fullWidth validate={[required()]} label="Name" />
              <SelectInput fullWidth
                           source="status"
                           choices={[
                             { id: 'active', name: 'active' },
                             { id: 'inactive', name: 'inactive' },
                           ]}
                           validate={[required()]}
                           label="Status"
              />
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Edit>
  )
}
