'use client'

import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'

import { RoomList } from './room/list'
import { RoomEdit } from './room/edit'
import { RoomCreate } from './room/create'

import { UserList } from './user/list'
import { UserEdit } from './user/edit'
import { UserCreate } from './user/create'

const dataProvider = simpleRestProvider(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/api`
)

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="users"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
        recordRepresentation="name"
      />
      <Resource
        name="rooms"
        list={RoomList}
        create={RoomCreate}
        edit={RoomEdit}
        recordRepresentation="name"
      />
    </Admin>
  )
}

export default App
