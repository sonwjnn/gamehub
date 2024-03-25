import { faker } from '@faker-js/faker'

const generateRandomUserID = () =>
  faker.number.int({ min: 100000000000000, max: 999999999999999 }).toString()

export const generateFakeCurrentUser = () => ({
  id: generateRandomUserID(),
  name: 'Repeep',
  image: 'https://avatars.githubusercontent.com/u/127363116?v=4',
  username: 'sonwin111',
  password: 'hoangson123',
  token: 'token',
  createdAt: new Date(),
  updatedAt: new Date(),
})
