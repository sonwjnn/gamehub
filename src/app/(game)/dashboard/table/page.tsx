import tableApi from '@/services/api/modules/table-api'
import { TableList } from './_components/list'
import { UserBoard } from '@/components/user-board'

const TablePage = async () => {
  const { response: tables } = await tableApi.getTables()

  return (
    <div className="boding_main">
      <div className="sidebar_left">
        <UserBoard />
      </div>
      <div className="content_main">
        <div className="inner">
          <div className="form_custom form_room w-full ">
            <h2 className="ttl_main fz-18">
              <span>
                <strong className="icon sz-24 icon-color-white flex-shrink">
                  <i className="icon-room"></i>
                </strong>
                LIST TABLE
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

                <nav className="pagination mt-16 flex flex-end">
                  <ul className="page-numbers nav-pagination links text-center">
                    <li>
                      <span className="prev page-number">
                        <span className="icon sz-16 icon-color-white">
                          <i className="icon-arr_left"></i>
                        </span>
                      </span>
                    </li>
                    <li>
                      <span className="page-number">1</span>
                    </li>
                    <li>
                      <span className="page-number">2</span>
                    </li>
                    <li>
                      <span className="page-number">3</span>
                    </li>
                    <li>
                      <span className="page-number current">4</span>
                    </li>
                    <li>
                      <span className="page-number dots">…</span>
                    </li>
                    <li>
                      <span className="page-number">14</span>
                    </li>
                    <li>
                      <span className="next page-number icon-color-white">
                        <span className="icon sz-16">
                          <i className="icon-arr_right"></i>
                        </span>
                      </span>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-12 col-md-4 py-8">
                <div className="room room_event">
                  <p className="text-center">COMMING SOON</p>
                  <br />
                  <span className="fz-14">Event Room</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TablePage
