import { CardMedia, Paper, Typography } from "@mui/material";

export default function ServiceItem({ service }) {
  return (
    <Paper
      sx={{
        margin: 4,
        border: 1,
        borderRadius: 5,
        borderColor: "success.main",
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CardMedia
        component="img"
        image={service.image}
        sx={{
          marginX: "auto",
          width: 160,
          height: 160,
          padding: 5,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "success.main",
          marginBottom: 2,
        }}
      >
        {service.name}
      </Typography>
    </Paper>
  );
}
