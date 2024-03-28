'use client'

import { AdminLayout } from './adminLayout'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import WalletIcon from '@mui/icons-material/Wallet'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import RememberMeIcon from '@mui/icons-material/RememberMe'
import GroupIcon from '@mui/icons-material/Group'

import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'

import { RoomList } from './room/list'
import { RoomEdit } from './room/edit'
import { RoomCreate } from './room/create'

import { UserList } from './user/list'
import { UserEdit } from './user/edit'
import { UserCreate } from './user/create'

import { EventsList } from './events/list'
import { EventsEdit } from './events/edit'
import { EventsCreate } from './events/create'

import { BanksList } from './banks/list'
import { BanksEdit } from './banks/edit'
import { BanksCreate } from './banks/create'

import { RechargeList } from './recharge/list'
import { RechargeEdit } from './recharge/edit'
import { RechargeCreate } from './recharge/create'

import { WithdrawList } from './withdraw/list'
import { WithdrawEdit } from './withdraw/edit'
import { WithdrawCreate } from './withdraw/create'

import { MessageList } from './message/list'
import { MessageEdit } from './message/edit'
import { MessageCreate } from './message/create'

import { MemberList } from './member/list'
import { MemberEdit } from './member/edit'
import { MemberCreate } from './member/create'

import { SettingsList } from './settings/list'
import { SettingsEdit } from './settings/edit'
import { SettingsCreate } from './settings/create'

const dataProvider = simpleRestProvider(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
)

const App = () => {

  return (
    <Admin dataProvider={dataProvider} layout={AdminLayout}>
      <Resource
        icon={GroupIcon}
        name="users"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
        recordRepresentation="name"
      />


      <Resource
        icon={RememberMeIcon}
        name="members"
        list={MemberList}
        create={MemberCreate}
        edit={MemberEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={AccountBalanceIcon}
        name="banks"
        list={BanksList}
        create={BanksCreate}
        edit={BanksEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={AccountBalanceWalletIcon}
        name="recharges"
        list={RechargeList}
        create={RechargeCreate}
        edit={RechargeEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={WalletIcon}
        name="withdraws"
        list={WithdrawList}
        create={WithdrawCreate}
        edit={WithdrawEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={EventSeatIcon}
        name="events"
        list={EventsList}
        create={EventsCreate}
        edit={EventsEdit}
        recordRepresentation="name"
      />

      <Resource
        icon={MeetingRoomIcon}
        name="rooms"
        list={RoomList}
        create={RoomCreate}
        edit={RoomEdit}
        recordRepresentation="name"
      />

      {/*<Resource*/}
      {/*  name="messages"*/}
      {/*  list={MessageList}*/}
      {/*  create={MessageCreate}*/}
      {/*  edit={MessageEdit}*/}
      {/*  recordRepresentation="name"*/}
      {/*/>*/}

      {/*<Resource*/}
      {/*  name="settings"*/}
      {/*  list={SettingsList}*/}
      {/*  create={SettingsCreate}*/}
      {/*  edit={SettingsEdit}*/}
      {/*  recordRepresentation="name"*/}
      {/*/>*/}


    </Admin>
  )
}

export default App
