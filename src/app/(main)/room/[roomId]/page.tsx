import Image from "next/image";
import { OtherPlayer } from "./_components/other-player";
import { CurrentPlayer } from "./_components/current-player";
import { TableCardInfo } from "./_components/table-card-info";

const RoomPage = () => {
  return (
    <div className="wrapper">
      <Image
        src="/images/table.png"
        alt="tableImage"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <div className="inner">
        <div className="list_user">
          <div className="wrap_list">
            <OtherPlayer />
            <OtherPlayer flip />
            <OtherPlayer type="fold" />
            <OtherPlayer type="active" />
            <OtherPlayer />
            <OtherPlayer flip />
            <OtherPlayer />
            <OtherPlayer />
            <OtherPlayer />
          </div>
        </div>
      </div>
      <TableCardInfo />
      <CurrentPlayer />
    </div>
  );
};

export default RoomPage;
