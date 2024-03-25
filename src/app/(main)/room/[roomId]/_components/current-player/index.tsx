import { cn } from "@/lib/utils";
import Image from "next/image";
import { Hand } from "../hand";
import { UserAvatar } from "@/components/user-avatar";

interface CurrentPlayerProps {
  type?: "fold" | "active" | "default";
  flip?: boolean;
}

export const CurrentPlayer = ({
  type = "default",
  flip = false,
}: CurrentPlayerProps) => {
  return (
    <div className="group_tool flex flex-space gap-12">
      <div className="group_flush">
        <div className="ttl">
          <span>ROYAL FLUSH</span>
        </div>
        <div className="content flex flex-midle gap-8 flex-center">
          <div className="star">
            <Image
              src="/images/star.png"
              alt="starImage"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="btn_detail">Detail</div>
        </div>
      </div>
      <div className="group_left">
        <div className="group_user">
          <div className="wrap">
            <div className="flex flex-midle">
              <div className="left">
                <div className="avatar">
                  <div className="imgDrop ratio_1_1">
                    <UserAvatar
                      className="absolute inset-0"
                      imageUrl="/images/avatar.png"
                      name="user"
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <Hand
                  imageUrlFirst="/images/pocker_on.png"
                  imageUrlSecond="/images/pocker_on.png"
                  flip={flip}
                />
              </div>
            </div>
            <div className="flex info_user">
              <div className="left sp_full">
                <div className="name text-center">Player2012</div>
              </div>
              <div className="right sp_full">
                <div className="money fw-700">$ 1.500.324</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="toolbar">
        <div className="item">
          <span className="number">1</span>
          <div className="value">Quarter</div>
        </div>
        <div className="item">
          <span className="number">2</span>
          <div className="value">Half</div>
        </div>
        <div className="item">
          <span className="number">3</span>
          <div className="value">Full</div>
        </div>
        <div className="item">
          <span className="number number_left">4 </span>
          <span className="number">5</span>
        </div>
        <div className="item">
          <span className="number">5</span>
          <div className="value">Raise</div>
        </div>
        <div className="item">
          <span className="number">7</span>
          <div className="value">Call</div>
        </div>
        <div className="item">
          <span className="number">8</span>
          <div className="value">Fold</div>
        </div>
        <div className="item">
          <span className="number">9</span>
          <div className="value">All in</div>
        </div>
      </div>
    </div>
  );
};
