import Image from 'next/image'

interface TableCardsProps {}

export const TableCards = ({}: TableCardsProps) => {
  return (
    <div className="group_midle">
      <div className="group_pocker">
        <div className="item item_active">
          <div className="pocker">
            <div className="imgDrop">
              <Image
                src="/images/pocker_on.png"
                alt="cardImage"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
        <div className="item item_active">
          <div className="pocker">
            <div className="imgDrop">
              <Image
                src="/images/pocker_on.png"
                alt="cardImage"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
        <div className="item">
          <div className="pocker">
            <div className="imgDrop">
              <Image
                src="/images/pocker.png"
                alt="cardImage"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </div>
        <div className="item">
          <div className="pocker"></div>
        </div>
        <div className="item">
          <div className="pocker"></div>
        </div>
      </div>
      <div className="group_number flex flex-midle flex-center gap-24">
        <div className="text">
          Total:<span className="fw-900">$ 5.252</span>
        </div>
        <div className="text">
          Call:<span className="fw-900">$ 1.500</span>
        </div>
      </div>
    </div>
  )
}
