import { Box, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "@emotion/styled";
import { useState } from "react";

const images = [
  "https://nhakhoask.com/wp-content/uploads/2023/12/banner-web-tet-1-1.webp",
  "https://nhakhoask.com/wp-content/uploads/2024/01/z5034977957375_b470349570b9a9d6a1e338c1d27a92e7.webp",
  "https://nhakhoask.com/wp-content/uploads/2023/12/tron-bo-16-rang-toan-su-24tr-web-min.webp",
  "https://nhakhoask.com/wp-content/uploads/2023/11/cover-web-29.webp",
];

const Image = styled.img`
  transition: opacity 1s;
  position: absolute;
`;
export default function Carousel() {
  const [index, setIndex] = useState(0);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Button
          sx={{
            position: "absolute",
            top: "55%",
          }}
          onClick={() => {
            if (index === 0) {
              setIndex(images.length - 1);
            } else {
              setIndex(index - 1);
            }
          }}
        >
          <ArrowBackIosNewIcon color="success" />
        </Button>
        <div>
          {images.map((image, i) => (
            <Image
              key={i}
              src={image}
              style={{
                opacity: index === i ? 1 : 0,
                width: "100%",
                height: "auto",
                transition: "opacity 1s",
              }}
            />
          ))}
        </div>
        <Button
          sx={{
            position: "absolute",
            top: "55%",
            right: "0",
          }}
          onClick={() => {
            if (index === images.length - 1) {
              setIndex(0);
            } else {
              setIndex(index + 1);
            }
          }}
        >
          <ArrowForwardIosIcon color="success" />
        </Button>
      </Box>

      <div style={{ marginTop: "90vh" }}></div>
    </Box>
  );
}
