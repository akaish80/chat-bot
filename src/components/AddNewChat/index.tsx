// import { addNewChat } from "../../utils";
// import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import type { OverridableStringUnion } from "@mui/types";
import { Box, type ButtonPropsSizeOverrides } from "@mui/material";
import ButtonComp from "../ButtonComp";
import { useAppContext } from "../../Context/AppContext";
import { addNewChat } from "../../utils";

const AddNewChat = (props: {
size?: OverridableStringUnion<
"small" | "medium" | "large",
ButtonPropsSizeOverrides
>;
}) => {
const { size = "medium" } = props;
const navigate = useNavigate();

const { handleCreateChat } = useAppContext() || {
handleCreateChat: () => {},
};
  return (
    <Box
      sx={{
        p: 2,
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        gap: 1,
        marginTop: "auto",
      }}
    >
      <ButtonComp
        label="Add New Chat"
        variant="contained"
        size={size}
        handleClick={() => addNewChat(handleCreateChat, navigate)}
      />
    </Box>
  );
};

export default AddNewChat;