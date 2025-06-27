import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SlideInPanel({
  open,
  onClose,
  title,
  children,
  anchor = "right",
  width = 500,
}) {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
        },
      }}
      transitionDuration={300}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #ddd",
          marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>{children}</Box>
    </Drawer>
  );
}
