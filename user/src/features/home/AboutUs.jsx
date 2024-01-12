import { Card, CardMedia, Typography } from "@mui/material";

export default function AboutUs() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingX: 30,
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
        Về chúng tôi
      </Typography>
      <CardMedia
        component="img"
        image="/logo.png"
        sx={{
          marginX: "auto",
          width: 250,
          height: 200,
          padding: 5,
        }}
      ></CardMedia>
      <Typography
        sx={{
          padding: 2,
          fontSize: 28,
        }}
      >
        Chúng tôi tự tin với đội ngũ bác sĩ chuyên nghiệp, có kinh nghiệm và
        được đào tạo chuyên sâu trong nhiều lĩnh vực nha khoa. Sự hiểu biết
        chuyên sâu và kỹ năng nghề nghiệp của đội ngũ bác sĩ là một trong những
        yếu tố cần thiết giúp chúng tôi đáp ứng mọi nhu cầu y tế của khách hàng.
      </Typography>
    </Card>
  );
}
