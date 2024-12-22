import React from "react";
import { Typography, Stack, useMediaQuery, useTheme } from "@mui/material";
import { envVars } from "../../App";

interface ContactInfoProps {
  value: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ value }) => (
  <Typography variant="body2" component="p">
    {value}
  </Typography>
);

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div style={{boxShadow: "0 -0.2em 0.3em rgba(0, 0, 0, 0.1)" }}>
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          background: `${theme.palette.background.default}`,
          color: "white",
        }}
      >
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          style={{ display: "flex", justifyContent: "center", gap: "20px" }}
        >
          <ContactInfo value={envVars.SITE_PHONE} />
          <ContactInfo value={envVars.SITE_EMAIL} />
        </Stack>
        <Typography
          variant="body2"
          component="p"
          style={{ marginBottom: "10px" }}
        >
          {envVars.SITE_RIGHTS}
        </Typography>
      </footer>
    </div>
  );
};
export default Footer;
