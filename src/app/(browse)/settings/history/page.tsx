import { format } from 'date-fns'
import { HistoriesClient } from './_components/client'
import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import historyApi from '@/services/api/modules/history-api'
import { HistoryColumn } from './_components/columns'
import { formatChipsAmount } from '@/utils/formatting'

const HistoryPage = async () => {
  const user = await currentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { response: histories } = await historyApi.getAllByUserId({
    userId: user.id,
  })

  const formattedHistories: HistoryColumn[] = histories.map((item: any) => ({
    id: item.id,
    name: item.match.table.name,
    amount: `+$${formatChipsAmount(+item.amount)}`,
    status: 'Win',
    createdAt: format(item.createdAt, 'dd/MM/yyyy'),
  }))

  return (
    <div className="form_custom">
      <h2 className="ttl_main fz-18">
        <span>
          <strong className="icon sz-24 icon-color-white flex-shrink">
            <i className="icon-history"></i>
          </strong>
          HISTORY
        </span>
      </h2>
      {/* <div className="row flex flex-center mt-16 ">
        <div className="col-12">
          <div className="filter_history flex flex-end gap-16 flex-midle">
            <div>
              <div className="input-group">
                <div className="wrap-input">
                  <input
                    className="form-control transition rounded-md"
                    type="text"
                    value=""
                    placeholder=""
                    required
                  />
                  <label>Room</label>
                  <span className="validation">Text err</span>
                </div>
              </div>
            </div>
            <div>
              <div className="input-group select-group undefined">
                <div className="wrap-input">
                  <input
                    className="form-control transition rounded-md"
                    type="text"
                    value=""
                    placeholder=""
                    required
                    readOnly
                  />
                  <label>Chọn trạng thái</label>
                  <span className="validation">Text err</span>
                  <div className="dropdown_content">
                    <ul>
                      <li>Text demo</li>
                      <li>Text demo</li>
                      <li>Text demo</li>
                      <li>Text demo</li>
                      <li>Text demo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="input-group select-group undefined">
                <div className="wrap-input">
                  <input
                    className="form-control transition rounded-md"
                    type="text"
                    value=""
                    placeholder=""
                    required
                    readOnly
                  />
                  <label>Chọn thời gian</label>
                  <span className="validation">Text err</span>
                  <div className="dropdown_content">
                    <ul>
                      <li>Text demo</li>
                      <li>Text demo</li>
                      <li>Text demo</li>
                      <li>Text demo</li>
                      <li>Text demo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="table_history">
            <div className="tables">
              <div className="tables_head">
                <div className="tables_td">Thời gian</div>
                <div className="tables_td">Room</div>
                <div className="tables_td">Số tiền</div>
                <div className="tables_td">Trạng thái</div>
              </div>
              <div className="tables_body">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="tables_tr">
                    <div className="tables_td">1/1/2024</div>
                    <div className="tables_td">0001</div>
                    <div className="tables_td">+10.000.000</div>
                    <div className="tables_td">
                      <span className="color-green">Thắng</span>{' '}
                      <span className="color-red">Thua</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <nav className="pagination mt-16 flex flex-end">
            <ul className="page-numbers nav-pagination links text-center">
              <li>
                <span className="prev page-number">
                  <span className="icon sz-16 icon-color-white">
                    {' '}
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
      </div> */}
      <HistoriesClient data={formattedHistories || []} />
    </div>
  )
}

export default HistoryPage
