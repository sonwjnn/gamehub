import React from 'react'
import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';


export const AdminMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Menu.ResourceItem name="users" />
    <Menu.ResourceItem name="members" />
    <Menu.ResourceItem name="banks" />
    <Menu.ResourceItem name="recharges" />
    <Menu.ResourceItem name="withdraws" />
    <Menu.ResourceItem name="events" />
    <Menu.ResourceItem name="rooms" />
  </Menu>
);