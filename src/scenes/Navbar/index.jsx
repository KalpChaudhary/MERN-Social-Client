import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Typography,
  Select,
} from "@mui/material";

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  
  const [isMobilemenuToggled, setIsMobilemenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  const neutralLight = theme.palette.neutral.light;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1rem">
        <Typography
          fontSize="clamp(1rem, 2rem , 2.25rem)"
          fontWeight="bold"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Kalp
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="5px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search ..." />
            <IconButton >
              <Search  />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {isNonMobileScreens ? (
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: ".25rem",
                p: ".25rem 1rem",
                "&.MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
                "&.MuiSvgIcon-root": {
                  pr: ".25rem",
                  width: "3rem",
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                value="Logout"
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/");
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobilemenuToggled(!isMobilemenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {!isNonMobileScreens && isMobilemenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobilemenuToggled(!isMobilemenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>
          {/*Menu items*/}
          <FlexBetween
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="2rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ fontSize: "25px" }} />
              ) : (
                <DarkMode sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: ".25rem",
                  p: ".25rem 1rem",
                  "&.MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                  "&.MuiSvgIcon-root": {
                    pr: ".25rem",
                    width: "3rem",
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem value="Logout" onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;