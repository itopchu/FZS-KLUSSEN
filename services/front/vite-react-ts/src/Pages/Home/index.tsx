import React from "react";
import { Typography, Stack, useTheme } from "@mui/material";
import ServiceCards from "../Service/ServiceCards";
import { Img } from 'react-image';
import { useWindowContext } from "../../Providers/Windows";

const BACKEND_URL: string = import.meta.env.VITE_URL_BACKEND as string;

const AboutUs: React.FC = () => {
  const theme = useTheme();
  const { screenSize } = useWindowContext();
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
        WE ARE FZS
      </Typography>
      <Stack
        sx={{
          "*": {
            textAlign: "left",
          },
        }}
        spacing={3}
      >
        <Typography>
          <strong>WE BUILD.</strong> In close collaboration with a steady, well
          known and qualified group of subcontractors, all specialists in their
          own disciplines. Together we are capable of building from small to
          large in the higher segment. But as team players we’re always open to
          get in touch with new and/or your favorite professionals.
        </Typography>
        <Typography>
          <strong>WE MANAGE</strong> with suburb personal care and attention. We
          always strive for the highest quality, take care off all communication
          and coordination so YOU can enjoy the RIDE. As spin docters we operate
          at our best in the center of your project. And we like to have FUN
          doing this.
        </Typography>
        <Typography>
          <strong>WE DESIGN.</strong> By carefully listening and asking the
          right questions. By putting our skills in place we serve your demand,
          but we’re bold enough to present our own ideas. We like to be involved
          from start till the finish of a project and create a strong cohesion
          between design, function and your budget.
        </Typography>
        <Typography>
          By combining a construction company with an architectural firm we can
          deliver this full circle of services.
        </Typography>
        <Typography>
          But we also build for other architects and interior-architects.
          Without compromising any of their designs. It is always a great
          challenge to build a good design. We speak the language and know how
          to get things build with great precision and high quality details.
          Besides that it challenges us not to get stuck in one style and it is
          a great opportunity to keep learning.
        </Typography>
      </Stack>
    </Stack>

  );
};

const Home: React.FC = () => {
  const SITE_LOGO: string = import.meta.env.VITE_SITE_LOGO as string;

  return (
    <>
      <Img
        loading="lazy"
        src={`${BACKEND_URL}/${SITE_LOGO}`}
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
