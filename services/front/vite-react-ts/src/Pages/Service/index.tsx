import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, useTheme } from "@mui/material";
import axios from "axios";
import { ServiceDTO } from "./ServiceCards";
import { Img } from 'react-image';
import { useWindowContext } from "../../Providers/Windows";
import { envVars } from "../../App";

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const theme = useTheme();
  const { screenSize } = useWindowContext();

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await axios.get(`${envVars.URL_BACKEND}/services`);
        const servicesDTO = response.data;
  
        if (Array.isArray(servicesDTO)) {
          setServices(servicesDTO);
        } else {
          console.warn(`Response is not an array, setting services to an empty array\nRequest URL: ${envVars.URL_BACKEND}/services - This happened while fetching services data.`);
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
      }
    }
    fetchServices();
  }, []);

  return (
    <Box sx={{ paddingY: '1em', minHeight: '90vh' }}>
      <Stack direction="column">
        {services.map((service, index) => (
          <Stack
            gap={2}
            paddingY={"2em"}
            paddingX={screenSize === 'mobile' ? "2em" : screenSize === 'wide' ? "5em" : "10em"}
            bgcolor={index % 2 ? theme.palette.customColors.color1 : theme.palette.customColors.color2}
            key={index}
            direction={screenSize === 'mobile' ? "column" : "row"}
            flexDirection={screenSize === 'mobile' ? "column-reverse" : index % 2 === 0 ? "row-reverse" : "row"}
            alignItems="center"
            justifyContent={"center"}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Stack
              direction={"column"}
              textAlign={"center"}
              alignContent={"center"}
              gap={2}
              flex={1}
            >
              <Typography
                color={theme.palette.primary.main}
                variant="h3"
                gutterBottom
              >
                {service.title}
              </Typography>

              <Typography
                variant="body1"
                color={theme.palette.text.tertiary}
                fontWeight={700}
              >
                {service.description}
              </Typography>
              {service.explanation && (
                <Typography
                  variant="body2"
                  color={theme.palette.text.tertiary}
                >
                  {service.explanation}
                </Typography>
              )}
            </Stack>
            <Img
              loading="lazy"
              src={`${envVars.URL_BACKEND}/${service.image}`}
              alt={service.title}
              width={screenSize === 'mobile' ? "100%" : "auto"}
              style={{
                aspectRatio: "16 / 9",
                height: "16em",
                objectFit: "cover",
                borderRadius: "1em",
              }}
            />
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default Services;
