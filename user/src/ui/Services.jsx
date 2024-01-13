import { Card, Grid, Typography } from "@mui/material";
import ServiceItem from "./ServiceItem";

const services = [
  {
    name: "Trám răng",
    image: "/services/tramrang.png",
  },
  {
    name: "Niềng răng",
    image: "/services/niengrang.png",
  },
  {
    name: "Nhổ răng",
    image: "/services/nhorang.png",
  },
  {
    name: "Cạo vôi răng",
    image: "/services/caovoirang.png",
  },
  {
    name: "Tẩy trắng răng",
    image: "/services/taytrangrang.png",
  },
];

export default function Services({ title }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          padding: 2,
          color: "success.main",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        {title ?? "Dịch vụ nổi bật"}
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{
          padding: 5,
          justifyContent: "center",
        }}
      >
        {services.map((service) => (
          <Grid item xs={12} md={4} key={service.name}>
            <ServiceItem service={service} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
