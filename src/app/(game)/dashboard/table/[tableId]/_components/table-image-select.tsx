import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  TalbeImageType,
  useTableImage,
  TableImageEnum,
} from '@/store/use-table-image'

export const TableImageSelect = () => {
  const { setImageSrc, imageSrc } = useTableImage()

  const onValueChange = (value: TalbeImageType) => {
    setImageSrc(value)
  }

  const defaultLabel = TableImageEnum.V1 === imageSrc ? 'v1' : 'v2'

  return (
    <Select onValueChange={onValueChange} defaultValue={imageSrc}>
      <SelectTrigger className="w-[80px] py-2 h-8">
        <SelectValue placeholder={defaultLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value={TableImageEnum.V1}
          defaultChecked={defaultLabel === 'v1'}
        >
          v1
        </SelectItem>
        <SelectItem
          value={TableImageEnum.V2}
          defaultChecked={defaultLabel === 'v2'}
        >
          v2
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
