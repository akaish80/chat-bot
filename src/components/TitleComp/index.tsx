
import { Box, Typography } from "@mui/material";

const TitleComp = (props: { title: string }) => {
    const { title } = props;
    return (
        <Box
            sx={{
                p: 2,
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Typography variant="h5" fontWeight="bold">
                {title}
            </Typography>
        </Box>
    );
};

export default TitleComp;