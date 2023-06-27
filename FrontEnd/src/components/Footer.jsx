import { Link, Typography } from "@mui/material"

export const Footer = () => {
    return (
        <Typography variant="body2" color='text.secondary' align="center" sx={{ backgroundColor: 'secondary.main' }}>
            {"Copyright © "}
            <Link color='inherit' href="https://www.hackaboss.com/"> Hack A Boss</Link>{" "}
            {new Date().getFullYear()}{"."}
        </Typography>
    )
}
