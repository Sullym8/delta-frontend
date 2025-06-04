// import DriverCard from "../driver-card/DriverCard";

// // @ts-expect-error temp
// const CardStack = ({ cards }) => {
//   const scaleFactor = 0.1; // Factor by which each card will shrink
//   const centerIndex = Math.floor((cards.length - 1) / 2); // Index of the center card

//   console.log(cards);
//   return (
//     <div className="relative w-[250px] h-[350px]">
//       {
//         // @ts-expect-error temp
//         cards.map((card, index) => {
//           const scale = 1 - Math.abs(centerIndex - index) * scaleFactor;

//           return (
//             <div
//               key={index}
//               className="absolute w-full h-full"
//               style={{
//                 transform: `rotate(${
//                   (index - centerIndex) * 5
//                 }deg) scale(${scale})`,
//                 transformOrigin: "bottom center",
//                 zIndex: -Math.abs(index - centerIndex), // Ensure proper stacking order
//                 filter: `brightness(${
//                   1 - Math.abs((index - centerIndex) / cards.length)
//                 })`,
//               }}
//             >
//               <DriverCard />
//             </div>
//           );
//         })
//       }
//     </div>
//   );
// };

// export default CardStack;
