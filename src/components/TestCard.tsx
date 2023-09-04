// // @ts-nocheck
// import React from "react";
// import Zoom from "react-reveal/Zoom";
// import { useState } from "react";
// import { Box, Overlay, Button, Group } from "@mantine/core";

// export default function TestCard() {
//   const [state, setState] = useState(false);

//   const handleCloock = () => {
//     setState(!state);
//   };

//   return (
//     <Group>
//       <Box sx={{ backgroundColor: "red", padding: "10px" }}> Hey</Box>
//       {state && (
//         <Zoom left opposite when={state}>
//           <Overlay blur={15} center>
//             <Button color="blue" radius="xl" onClick={() => setState(!state)}>
//               NSFW, click to reveal
//             </Button>
//           </Overlay>
//         </Zoom>
//       )}
//       <button
//         className="btn btn-success my-5"
//         type="button"
//         onClick={handleCloock}
//       >
//         Show Message
//       </button>
//     </Group>
//   );
// }
