import { Card, Grid } from "@mui/material";
import DoctorsItem from "./DoctorsItem";

const docktors = [
  {
    name: "Trần Tiến Mạnh",
    image:
      "https://nhakhoask.com/wp-content/uploads/2023/07/BS-Tien-Manh-786x1024.png",
    description: `Bác sĩ Trần Tiến Mạnh có hơn 5 năm kinh nghiệm điều trị thành công cho hàng nghìn khách hàng. Tốt nghiệp Đại học Y Hà Nội-chuyên khoa Răng hàm mặt, Bác sĩ được đánh giá là một trong những bác sĩ nha khoa giỏi tại Việt Nam, sở hữu trong tay nhiều chứng chỉ nha khoa cao cấp như: Chứng chỉ “Phục hình thẩm mỹ răng” tại HANODENT, Chứng chỉ cấy ghép răng Implant Nha khoa... Bác sĩ Trần Tiến Mạnh luôn nhạy bén trong nắm bắt xu thế thẩm mỹ răng và liên tục cập nhật những công nghệ điều trị nha khoa mới nhất đã để phục vụ khách hàng.

    Bên cạnh đó, bác sĩ Trần Tiến Mạnh  còn được khách hàng yêu mến nhờ sự tận tâm, trách nhiệm, luôn dành trọn tâm huyết vào từng ca bệnh, quan tâm tới chế độ chăm sóc răng miệng để mọi khách hàng có được nụ cười như ý.`,
  },
  {
    name: "Lại Ngọc Quý",
    image: "https://nhakhoask.com/wp-content/uploads/2023/06/bs3.png",
    description: `THS.BS Lại Ngọc Quý là chuyên gia trong chuyên khoa Răng – Hàm – Mặt, với kinh nghiệm hơn 13 năm trong lĩnh chăm sóc và thẩm mỹ răng miệng. Trong quá trình học tập và tu nghiệp tại  trường đại học trong và các khoá học ngoài nước, bác sĩ Quý đã đạt được nhiều chứng chỉ quan trọng trong đó phải kể đến chứng nhận NeoBiotech và Ormco đều là những chứng nhận Quốc tế về Nha khoa. Với mong muốn đem lại những trải nghiệm dịch vụ và kết quả tốt nhất cho khách hàng, bác sĩ Ngọc Quý không ngừng học hỏi những phương pháp, kỹ thuật chỉnh nha hiện đại nhất để mang tới những trải nghiệm và kết quả mỹ mãn nhất tới khách hàng khi đến với nha khoa SK.`,
  },
];

export default function Doctors() {
  return (
    <Card
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid container spacing={1}>
        {docktors.map((doctor, index) => (
          <DoctorsItem key={index} doctor={doctor} />
        ))}
      </Grid>
    </Card>
  );
}
