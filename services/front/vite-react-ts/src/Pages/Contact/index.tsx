import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Snackbar,
  SnackbarContent
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Stack, useTheme } from "@mui/system";
import { useWindowContext } from "../../Providers/Windows";
import { envVars } from "../../App";

// Define interface for contact form properties
interface ContactFormData {
  name: string;
  surname: string;
  phone: string;
  email: string;
  address: string;
  description: string;
}

// Initial state for contact form
const INITIAL_CONTACT_STATE: ContactFormData = {
  name: "",
  surname: "",
  phone: "",
  email: "",
  address: "",
  description: "",
};

// Custom styled TextField
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.primary.main,
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.light,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.primary,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiInputBase-input": {
    color: theme.palette.text.primary,
  },
  "& .MuiFormHelperText-root": {
    color: theme.palette.text.primary,
  },
}));

const SquareDescriptionTextField = styled(CustomTextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '1em', // Square shape for the input
  },
}));

const Contact: React.FC = () => {
  const [contactPhotos, setContactPhotos] = useState<File[]>([]);
  const [contactProps, setContactProps] = useState<ContactFormData>(INITIAL_CONTACT_STATE);
  const [successMessage, setSuccessMessage] = useState(false);
  const theme = useTheme();
  const { screenSize } = useWindowContext();

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const uploadedPhotos = Array.from(event.target.files);
    const imageFiles = uploadedPhotos.filter(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
    );

    if (imageFiles.length + contactPhotos.length <= 20) {
      setContactPhotos([...contactPhotos, ...imageFiles]);
    } else {
      alert("You can upload up to 20 photos.");
    }
  };

  const handleRemovePhoto = (index: number) => {
    setContactPhotos(contactPhotos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = new FormData();
    contactPhotos.forEach((photo) => data.append("images", photo));

    (Object.keys(contactProps) as Array<keyof ContactFormData>).forEach((key) => {
      data.append(key, contactProps[key]);
    });

    try {
      await axios.post(`${envVars.URL_BACKEND}/contact/info`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setSuccessMessage(true);
      setContactProps(INITIAL_CONTACT_STATE);
      setContactPhotos([]);
    } catch (error) {
      console.error("Error submitting form", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (successMessage) {
      timer = setTimeout(() => setSuccessMessage(false), 10000);
    }
    return () => clearTimeout(timer);
  }, [successMessage]);

  const updateContactProps = (field: keyof ContactFormData, value: string) => {
    setContactProps(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box
      minHeight="92vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      alignSelf={"center"}
      alignContent={"center"}
      textAlign={"center"}
      justifyItems={"center"}
      justifySelf={"center"}
      bgcolor={theme.palette.background.default}
      width={screenSize === 'mobile' ? "95%" : screenSize === 'wide' ? "60%" : "40%"}
    >
      <Stack
        spacing={5}
        width={"100%"}
        alignItems="center"
        justifyContent="center"
        alignSelf={"center"}
        alignContent={"center"}
        textAlign={"center"}
        justifyItems={"center"}
        justifySelf={"center"}
      >
        <Typography color={theme.palette.primary.main} variant="h4" component="h1" gutterBottom textAlign="center">
          Contact Us
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
          <Box sx={{ display: "flex", gap: "1em" }}>
            <CustomTextField
              autoComplete="given-name"
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              value={contactProps.name}
              onChange={(e) => updateContactProps("name", e.target.value)}
              required
            />
            <CustomTextField
              autoComplete="family-name"
              label="Surname"
              name="surname"
              variant="outlined"
              fullWidth
              value={contactProps.surname}
              onChange={(e) => updateContactProps("surname", e.target.value)}
              required
            />
          </Box>

          <Box sx={{ display: "flex", gap: "1em" }}>
            <CustomTextField
              autoComplete="tel"
              label="Phone Number"
              name="phone"
              variant="outlined"
              fullWidth
              value={contactProps.phone}
              onChange={(e) => updateContactProps("phone", e.target.value)}
              required
            />
            <CustomTextField
              autoComplete="email"
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              type="email"
              value={contactProps.email}
              onChange={(e) => updateContactProps("email", e.target.value)}
              required
            />
          </Box>

          <CustomTextField
            autoComplete="address"
            label="Address"
            name="address"
            variant="outlined"
            fullWidth
            value={contactProps.address}
            onChange={(e) => updateContactProps("address", e.target.value)}
            required
          />

          <SquareDescriptionTextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={contactProps.description}
            onChange={(e) => updateContactProps("description", e.target.value)}
            required
            placeholder="Enter your description here..."
          />

          <Button variant="contained" component="label" fullWidth>
            Upload Photos
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </Button>

          <Typography variant="body2" color="textSecondary">
            {contactPhotos.length} photo(s) selected
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(5em, 1fr))",
              gap: "1em",
              width: "100%",
            }}
          >
            {contactPhotos.map((photo, index) => (
              <Box
                key={index}
                sx={{ position: "relative", opacity: contactPhotos.length === 0 ? 0 : 1 }}
              >
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Uploaded ${index}`}
                  style={{
                    width: "100%",
                    height: "5em",
                    objectFit: "cover",
                    transition: "opacity 0.3s ease-out",
                  }}
                />
                <IconButton
                  onClick={() => handleRemovePhoto(index)}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      color: "rgba(255, 255, 255, 0.9)",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Stack>
      <Snackbar
        open={successMessage}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          message="Got it! We will contact you as soon as possible."
          sx={{
            fontSize: "1.5rem",
            padding: "1em",
            backgroundColor: `${theme.palette.success.light}`,
            color: "#fff",
            borderColor: `${theme.palette.success.dark}`,
            borderRadius: "2em",
            boxShadow: "10em 40em 30em rgba(0, 0, 0, 0.8)",
          }}
        />
      </Snackbar>
    </Box>
  );
};

export default Contact;