import { cn } from "@/lib/utils";
import { Card } from "./other-player/card";

interface HandProps {
  flip?: boolean;
  imageUrlFirst: string;
  imageUrlSecond: string;
}

export const Hand = ({ flip, imageUrlFirst, imageUrlSecond }: HandProps) => {
  return (
    <div className={cn("pocker_list", flip && "has_active")}>
      <div className={cn("item", flip && "status_active")}>
        <div className="pocker">
          <Card imageUrl={imageUrlFirst} flip={flip} value={10} />
        </div>
      </div>
      <div className={cn("item", flip && "status_active")}>
        <div className="pocker">
          <Card imageUrl={imageUrlSecond} flip={flip} value={10} />
        </div>
      </div>
    </div>
  );
};
