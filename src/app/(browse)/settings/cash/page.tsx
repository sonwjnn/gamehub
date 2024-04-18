import React from 'react'

const CashPage = () => {
  return (
    <div className="form_custom">
      <h2 className="ttl_main fz-18">
        <span>
          <strong className="icon sz-24 icon-color-white flex-shrink">
            <i className="icon-cash"></i>
          </strong>
          CASH GAME
        </span>
      </h2>
      <div className="row flex flex-center gapy-40 mt-16">
        <div className="col-12">
          <div className="filter_history flex flex-end gap-16 flex-midle">
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
                  <label>Chọn hành động</label>
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
        <div className="col-12 col-md-12 col-xl-5 col-history">
          <form action="">
            <h2 className="text-up mb-16 ttl_sub">
              THÔNG TIN TÀI KHOẢN NGÂN HÀNG
            </h2>
            <div className="input-group">
              <div className="wrap-input">
                <input
                  className="form-control transition rounded-md"
                  type="text"
                  value=""
                  placeholder=""
                  required
                />
                <label>Số thẻ</label>
                <span className="validation">Text err</span>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="input-group">
                  <div className="wrap-input">
                    <input
                      className="form-control transition rounded-md"
                      type="text"
                      value=""
                      placeholder=""
                      required
                    />
                    <label>Mgày hết hạn (MM/YY)</label>
                    <span className="validation">Text err</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <div className="wrap-input">
                    <input
                      className="form-control transition rounded-md"
                      type="text"
                      value=""
                      placeholder=""
                      required
                    />
                    <label>Mã bảo mật (CVV/CVC)</label>
                    <span className="validation">Text err</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="input-group">
              <div className="wrap-input">
                <input
                  className="form-control transition rounded-md"
                  type="text"
                  value=""
                  placeholder=""
                  required
                />
                <label>Tên chủ thẻ</label>
                <span className="validation">Text err</span>
              </div>
            </div>
            <div className="footing flex flex-end gap-8">
              <button className="btn_main">Save</button>
            </div>
          </form>
        </div>
        <div className="col-12 col-md-12 col-xl-7">
          <h2 className="text-up mb-16 ttl_sub">LỊCH SỬ NẠP / RÚT</h2>
          <div className="table_history mt-16">
            <div className="tables">
              <div className="tables_head">
                <div className="tables_td">Thời gian</div>
                <div className="tables_td">Hành động</div>
                <div className="tables_td">Số tiền</div>
                <div className="tables_td">Trạng thái</div>
              </div>
              <div className="tables_body">
                <div className="tables_tr">
                  <div className="tables_td">1/1/2024</div>
                  <div className="tables_td">Nạp</div>
                  <div className="tables_td">10.000.000</div>
                  <div className="tables_td">Thành công</div>
                </div>
                <div className="tables_tr">
                  <div className="tables_td">1/1/2024</div>
                  <div className="tables_td">Nạp</div>
                  <div className="tables_td">10.000.000</div>
                  <div className="tables_td">Thành công</div>
                </div>
                <div className="tables_tr">
                  <div className="tables_td">1/1/2024</div>
                  <div className="tables_td">Nạp</div>
                  <div className="tables_td">10.000.000</div>
                  <div className="tables_td">Thành công</div>
                </div>
                <div className="tables_tr">
                  <div className="tables_td">1/1/2024</div>
                  <div className="tables_td">Nạp</div>
                  <div className="tables_td">10.000.000</div>
                  <div className="tables_td">Thành công</div>
                </div>
                <div className="tables_tr">
                  <div className="tables_td">1/1/2024</div>
                  <div className="tables_td">Nạp</div>
                  <div className="tables_td">10.000.000</div>
                  <div className="tables_td">Thành công</div>
                </div>
                <div className="tables_tr">
                  <div className="tables_td">1/1/2024</div>
                  <div className="tables_td">Nạp</div>
                  <div className="tables_td">10.000.000</div>
                  <div className="tables_td">Thành công</div>
                </div>
                <div className="tables_tr">
                  <div className="tables_td">1/1/2024</div>
                  <div className="tables_td">Nạp</div>
                  <div className="tables_td">10.000.000</div>
                  <div className="tables_td">Thành công</div>
                </div>
                <div className="tables_tr">
                  <div className="tables_td">1/1/2024</div>
                  <div className="tables_td">Nạp</div>
                  <div className="tables_td">10.000.000</div>
                  <div className="tables_td">Thành công</div>
                </div>
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
                  {' '}
                  <span className="icon sz-16">
                    {' '}
                    <i className="icon-arr_right"></i>
                  </span>
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default CashPage
