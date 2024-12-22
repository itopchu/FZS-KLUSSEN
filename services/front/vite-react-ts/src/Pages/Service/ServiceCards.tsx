import { useState, useEffect } from "react";
import { Stack, Typography, Box, useTheme } from "@mui/material";
import axios from "axios";
import { Img } from 'react-image';
import { lighten, darken } from '@mui/system';
import { useWindowContext } from "../../Providers/Windows";
import { envVars } from "../../App";

export interface ServiceDTO {
  title: string;
  description: string;
  image: string;
  explanation?: string;
  mode: 'mobile' | 'wide' | 'big';
}

const ServiceCard: React.FC<ServiceDTO> = ({ title, description, image, mode }) => {
  const theme = useTheme();
  return (
    <Stack
      width={mode === 'mobile' ? "auto" : "350px"}
      direction={"column"}
      bgcolor={theme.palette.background.paper}
      borderRadius={"1em"}
      boxShadow="0em 0.1em 0.1em rgba(0, 0, 0, 0.2)"
      border={1}
      borderColor={"rgba(0,0,0,0.2)"}
    >
      <Img
        loading="lazy"
        src={image}
        alt={title}
        style={{
          width: "100%",
          borderRadius: "1em 1em 0 0",
          aspectRatio: "4/3",
          objectFit: "cover",
        }}
      />
      <Stack direction={"column"}
        bgcolor={theme.palette.background.paper}
        borderRadius={"1em"}
      >
        <Typography
          bgcolor={`${darken(theme.palette.primary.main, 0.1)}`}
          color={`${theme.palette.primary.contrastText}`}
          variant="h5"
          component="h2"
          fontWeight={700}
          paddingX={"2em"}
          paddingY={"0.4em"}
          style={{
            boxShadow: "0 0.2em 0.2em rgba(0, 0, 0, 0.15)",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            fontFamily: '"Barlow Semi Condensed", Helvetica, Arial, sans-serif',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          padding={"2em"}
          height={"100%"}
          color={`${theme.palette.text.secondary}`}
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
            fontFamily: '"Chivo", Helvetica, Arial, sans-serif',
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
};

const ServiceCards = () => {
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const { screenSize } = useWindowContext();
  const theme = useTheme();

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get(
          `${envVars.URL_BACKEND}/services`
        );
        const servicesDTO: ServiceDTO[] = response.data;
        setServices([]);
        if (Array.isArray(servicesDTO))
          setServices(servicesDTO);
      } catch (error) {
        setServices([]);
        console.error(error);
      }
    }
    fetchServices();
  }, []);

  return (
    <Box
      padding={"2em"}
      sx={{
        backgroundColor: lighten(theme.palette.background.default, 0.1),
        justifyContent: "space-evenly",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={`${envVars.URL_BACKEND}/${service.image}`}
            mode={screenSize}
          />
        ))}
    </Box>
  );
};

export default ServiceCards;
