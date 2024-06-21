'use client'

import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'
import { X } from 'lucide-react'
import { useParams } from 'next/navigation'

export const RuleModal = () => {
  const { isOpen, onClose, type } = useModal()

  const params = useParams()

  const isModalOpen = isOpen && type === 'rule'

  return (
    <div
      className={cn('modal', isModalOpen && 'show')}
      id={params?.tableId && 'modal_rule'}
    >
      <div className="modal_dark modal_close" onClick={onClose}></div>
      <div className="modal_dialog sz-lg">
        <div className="modal_content">
          <div className="modal_head">
            규칙
            <div className="btn_close modal_close" onClick={onClose}>
              <span className="icon sz-24">
                <i className="icon_close"></i>
              </span>
            </div>
          </div>
          <div className="modal_body">
            <div className="scrollbar">
              <h3 className="ttl color-primary text-up">
                {' '}
                <span>Thiết lập bàn chơi ban đầu</span>
              </h3>
              <div className="text">
                <p>- Số người chơi: từ 2 đến 10 người chơi</p>
                <p>
                  - Chọn ra người làm Dealer và đưa thẻ Dealer đặt trước mặt
                  người này. Để đảm bảo công bằng, sau mỗi ván chơi, vị trí
                  Dealer sẽ chuyển cho người bên trái theo chiều kim đồng hồ.
                  Như vậy tất cả người chơi đều sẽ lần lượt làm Dealer.
                </p>
                <p>
                  - Dealer tiến hành chia theo chiều kim đồng hồ, mỗi người chơi
                  2 lá bài và lật 5 lá bài đượt đặt úp ở giữa bàn chơi.
                </p>
              </div>
              <br />
              <h3 className="ttl color-primary text-up">
                <span>Tổng quan một ván Poker</span>
              </h3>
              <div className="text">
                <p>
                  - Một ván bài Poker bao gồm 4 vòng cược là:
                  <strong className="color-main">
                    Fre Flop, Flop, Turn, River.{' '}
                  </strong>
                </p>
                <p>
                  - Sau mỗi vòng cược, tất cả tiền cược được gom vào vào một chỗ
                  gọi là <strong className="color-main">Pot. </strong>Về nguyên
                  tắc, một vòng cược chỉ kết thúc khi tiền cược của tất cả người
                  chơi đều bằng nhau và không ai tố tiếp.{' '}
                </p>
                <p>
                  - Sau 4 vòng chơi, người chơi nào sở hữu Tay bài mạnh nhất sẽ
                  là người chiến thắng. Tuy nhiên, ván bài thực tế có thể kết
                  thúc bất cứ lúc nào, khi có người tố và tất cả những người
                  khác đều bỏ bài theo, khi đó người tố là người chiến thắng và
                  ván kết thúc.
                </p>
                <p>
                  - Người chiến thắng sẽ ăn toàn bộ số tiền cược của mọi người ở{' '}
                  <strong className="color-main">pot. </strong>Trường hợp người
                  chiến thắng đã cược hết tiền trước mọi người{' '}
                  <strong className="color-main">(all- in) </strong>thì chỉ có
                  thể ăn được tiền trong pot tính tới thời điểm tất tay.
                </p>
              </div>
              <br />
              <h3 className="ttl color-primary text-up">
                {' '}
                <span>Hành động trong một lượt</span>
              </h3>
              <div className="text">
                Ở mỗi lượt chơi, người chơi có quyền đưa ra một trong số cách
                hành động sau:
              </div>
              <br />
              <h4 className="color-main fw-700">Bỏ bài (Fold)</h4>
              <div className="text">
                <p>
                  Người chơi dừng chơi, ngồi chờ ván sau. Hành động này thường
                  xảy ra khi người chơi bị chia bài xấu không có cơ hội chiến
                  thắng hoặc khi người chơi không muốn bỏ thêm tiền cho đối thủ
                  để theo tiếp ván chơi. Bạn sẽ bị mất số tiền cược trước đó.
                </p>
              </div>
              <br />
              <h4 className="color-main fw-700">Theo (Call)</h4>
              <div className="text">
                Bạn bỏ ra số tiền bằng với số tiền của người chơi trước đó tố để
                theo ván đó.
              </div>
              <br />
              <h4 className="color-main fw-700">Cược (Bet)</h4>
              <div className="text">
                Bạn có thể cược khi chưa ai cược cả. Khi đó, những người chơi
                khác muốn tiếp tục chơi thì cần phải chơi ít nhất bằng số tiền
                của bạn đã cược (Call) hoặc cược thêm (Raise) hoặc bỏ bài
                (Fold).
              </div>
              <br />
              <h4 className="color-main fw-700">Tố (Raise)</h4>
              <div className="text">
                <p>
                  Khi có người đã đặt cược, bạn sẽ lựa chọn cược thêm gọi là Tố.
                </p>
                <p>
                  Ví dụ : Ban đầu hai người chơi A và B cược mỗi người 250, tổng
                  là 500. Người chơi A chọn Tố thêm 250. Vậy tổng là 750. Người
                  chơi B lúc này có 3 hành động được lựa chọn hoặc là Theo thì
                  cược thêm 250 như người chơi A, hoặc Tố thêm thì phải cược
                  thêm so với người chơi A ví dụ 350 hoặc Bỏ bài (Fold).
                </p>
              </div>
              <br />
              <h4 className="color-main fw-700">Tố tất (All- in)</h4>
              <div className="text">
                Đó là khi bạn tố bằng toàn bộ số tiền đang có của mình hay còn
                gọi là tất tay. Khi bạn tố tất và ván bài vẫn tiếp tục thì việc
                còn lại của bạn chỉ là ngồi xem. Ở cuối ván bài sẽ ngửa bài để
                phân định thắng thua. Nếu đến cuối cùng bạn là người chiến thắng
                thì bạn sẽ chỉ nhận được số tiền trong pot tính tới thời điểm
                bạn tố tất.
              </div>
              <br />
              <h4 className="color-main fw-700">Xem (Check)</h4>
              <div className="text">
                Khi chưa có ai cược, bạn cũng không cược và chờ hành động của
                người chơi khác.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
