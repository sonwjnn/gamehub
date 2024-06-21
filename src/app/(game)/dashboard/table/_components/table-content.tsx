import { TableWithPlayers } from '@/types'
import { TableList } from './list'
import Pagination from './pagination'

interface TableContentProps {
  tables: TableWithPlayers[]
  pageCount: number
}

export const TableContent = ({ tables, pageCount }: TableContentProps) => {
  return (
    <div className="content_main">
      <div className="inner">
        <div className="form_custom form_room w-full ">
          <h2 className="ttl_main fz-18">
            <span>
              <strong className="icon sz-24 icon-color-white flex-shrink">
                <i className="icon-room"></i>
              </strong>
              테이블
            </span>
          </h2>
          <div className="row flex flex-center gapy-40">
            <svg>
              <filter id="noiseFilter2">
                <feturbulence
                  type="fractalNoise"
                  baseFrequency="0.6"
                  stitchTiles="stitch"
                ></feturbulence>
              </filter>
              <clipPath id="rounded-clip">
                <rect
                  x="0"
                  y="0"
                  width="300"
                  height="300"
                  rx="20"
                  ry="20"
                ></rect>
              </clipPath>
            </svg>
            <div className="col-12 col-md-8">
              <TableList tables={tables} />

              {pageCount > 1 && <Pagination pageCount={pageCount} />}
            </div>
            <div className="col-12 col-md-4 py-8">
              <div className="room room_event">
                <p className="text-center">출시 예정</p>
                <br />
                <span className="fz-14">축제방</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
