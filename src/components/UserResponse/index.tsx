import { Box, Paper, Typography } from "@mui/material";

const UserResponse = (props: { message: string }) => {
    const { message } = props;

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mr: 1,
                    mt: 0.5,
                }}
            >
                <Paper sx={{ p: 1.5, bgcolor: "#e0e0e0" }}>
                    <Typography>{message}</Typography>
                </Paper>
            </Box>
            {/* <Box
sx={{
display: "flex",
justifyContent: "flex-end"
}}
>
<Typography
sx={{
fontSize: 14,
color: red
}}
>
You
</Typography>
</Box> */}
        </>
    );
};

export default UserResponse;