import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const SpinnerComp = () => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

const Spinner = React.memo(SpinnerComp)
export default Spinner;