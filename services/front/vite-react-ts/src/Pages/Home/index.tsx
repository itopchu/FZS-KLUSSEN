import React from "react";
import { Typography, Stack, useTheme } from "@mui/material";
import ServiceCards from "../Service/ServiceCards";
import { Img } from 'react-image';
import { useWindowContext } from "../../Providers/Windows";
import { fetchInfo, sectionDTO } from "../../App";
import { envVars } from "../../App";

const AboutUs: React.FC = () => {
  const theme = useTheme();
  const { screenSize } = useWindowContext();

  const aboutInfo: sectionDTO | null = fetchInfo("about");

  if (!aboutInfo) return null;

  return (
    <Stack
      paddingY={"2em"}
      paddingX={screenSize === 'mobile' ? "2em" : screenSize === 'wide' ? "5em" : "15em"}
      direction="column"
      style={{ backgroundColor: theme.palette.background.default }}
      sx={{ height: "100%", flex: 1 }}
    >
      <Typography
        variant="h2"
        color={theme.palette.primary.main}
      >
        {aboutInfo?.title}
      </Typography>
      <Stack
        sx={{
          "*": {
            textAlign: "left",
          },
        }}
        spacing={3}
      >
        {aboutInfo?.description.map((paragraph, index) => (
          <Typography key={index}>
            {paragraph}
          </Typography>
        ))}
      </Stack>
    </Stack>

  );
};

const Home: React.FC = () => {

  return (
    <>
      <Img
        loading="lazy"
        src={`${envVars.URL_BACKEND}/${envVars.SITE_BANNER}`}
        alt="banner"
        width={"100%"}
        height={"auto"}
        style={{
          maxHeight: "40vh",
          width: "100%",
          height: "40vh",
          objectFit: "cover",
        }}
      />
      <AboutUs />
      <ServiceCards />
    </>
  );
};

export default Home;
