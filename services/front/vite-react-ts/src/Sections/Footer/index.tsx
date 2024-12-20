import React from "react";
import { Typography, Stack, useMediaQuery, useTheme } from "@mui/material";

const siteRights: string = import.meta.env.VITE_SITE_RIGHTS as string;
const sitePhone: string = import.meta.env.VITE_SITE_PHONE as string;
const siteEmail: string = import.meta.env.VITE_SITE_EMAIL as string;

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
          <ContactInfo value={sitePhone} />
          <ContactInfo value={siteEmail} />
        </Stack>
        <Typography
          variant="body2"
          component="p"
          style={{ marginBottom: "10px" }}
        >
          {siteRights}
        </Typography>
      </footer>
    </div>
  );
};
export default Footer;
