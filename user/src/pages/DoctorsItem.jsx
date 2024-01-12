import { CardMedia, Grid, Paper, Typography } from "@mui/material";

export default function DoctorsItem({ doctor }) {
  return (
    <Grid item xs={12} sx={{ padding: 2 }}>
      <Paper sx={{ margin: 4, borderRadius: 2, display: "flex" }}>
        <CardMedia
          component="img"
          image={doctor.image}
          sx={{
            marginX: "auto",
            width: 400,
            padding: 5,
          }}
        />
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingX: 3,
            margin: 0,
            boxShadow: 0,
          }}
        >
          <Typography>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              Bác sĩ {doctor.name}
            </Typography>
            <Typography sx={{ fontSize: 16, color: "text.primary" }}>
              {doctor.description}
            </Typography>
          </Typography>
        </Paper>
      </Paper>
    </Grid>
  );
}
