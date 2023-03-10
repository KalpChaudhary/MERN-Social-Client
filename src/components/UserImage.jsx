import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        src={`https://mern-social-kalpchaudhary.herokuapp.com/assets/${image}`}
        alt="User"
        style={{ objectFit: "cover" , borderRadius : "50%"}}
        width={size}
        height={size}
      />
    </Box>
  );
};

export default UserImage;

