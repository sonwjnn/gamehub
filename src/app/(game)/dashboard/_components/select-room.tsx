import { CardItem } from '@/components/card-item'

interface SelectRoomProps {}

export const SelectRoom = ({}: SelectRoomProps) => {
  return <CardItem title="Select Room" redirectUrl="/dashboard/room" />
}
