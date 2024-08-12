import RacePicker from "../components/race-picker/RacePicker";
import { MdOutlineShare } from "react-icons/md";
import { MdOutlineReplay } from "react-icons/md";
import CardStack from "../components/card-stack/CardStack";

const Fantasy = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row overflow-x-auto justify-start gap-4">
        <RacePicker />
        <RacePicker />
        <RacePicker />
      </div>
      <div className="flex justify-between items-center mx-4">
        <div>
          <p className="font-bold text-xl">Saudi Arabian GP</p>
          <p className="text-xs">Prediction by Samar Khan</p>
        </div>
        <div className="flex gap-2">
          <MdOutlineShare size={24} />
          <MdOutlineReplay size={24} />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <CardStack cards={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
      </div>
    </div>
  );
};

export default Fantasy;
