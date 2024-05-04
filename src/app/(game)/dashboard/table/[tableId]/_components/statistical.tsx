interface StatisticalProps {}

export const Statistical = ({}: StatisticalProps) => {
  return (
    <div className="table_statistical">
      <div className="ttl">THỐNG KÊ</div>
      <div className="content">
        <dl className="flex flex-midle">
          <dt>Thắng :</dt>
          <dd>120 ván</dd>
          <dd className="flex gap-8 flex-midle">
            {' '}
            <span className="icon sz-8 flex-shrink">
              <i className="icon-coin"></i>
            </span>
            2000$
          </dd>
        </dl>
        <dl className="flex flex-midle">
          <dt>Thua :</dt>
          <dd>200 ván</dd>
          <dd className="flex gap-8 flex-midle">
            {' '}
            <span className="icon sz-8 flex-shrink">
              <i className="icon-coin"></i>
            </span>
            10000$
          </dd>
        </dl>
      </div>
    </div>
  )
}
