import DriverCardMini from "../driver-card-mini/DriverCardMini";
import BottomSheet from "../bottom-sheet/BottomSheet";

const DriverSelector = () => {
  return (
    <BottomSheet baseHeightRatio={0.55} expandedHeightRatio={0.8}>
      <DriverCardMini />
      <DriverCardMini />
      <DriverCardMini />
      <DriverCardMini />
    </BottomSheet>
  );
};

export default DriverSelector;
