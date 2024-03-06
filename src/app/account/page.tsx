"use client";
// ** React Imports
import {
  useState,
  ElementType,
  ChangeEvent,
  SyntheticEvent,
  useEffect,
} from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button, { ButtonProps } from "@mui/material/Button";

// ** Icons Imports
import Close from "@ant-design/icons/CloseOutlined";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserInfo } from "@/lib/features/auth.slice";
import AuthGuard from "../AuthGuard";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<
  ButtonProps & { component?: ElementType; htmlFor?: string }
>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));
const Account = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(true);
  const [imgSrc, setImgSrc] = useState<string>("/image/icon.png");

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader();
    const { files } = file.target as HTMLInputElement;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string);

      reader.readAsDataURL(files[0]);
    }
  };

  // Dispatch Redux
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const fetchUserInfo = async () => {
      await dispatch(getUserInfo()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    };
    fetchUserInfo();
  }, []);

  return (
    <AuthGuard>
      <div className="container mx-auto mt-10 rounded-xl shadow-lg">
        <CardContent>
          <form>
            <Grid container spacing={7}>
              <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ImgStyled
                    className="shadow-md"
                    src={userInfo?.avatarUrl || imgSrc}
                    alt="Profile Pic"
                  />
                  <Box>
                    <ButtonStyled
                      component="label"
                      variant="contained"
                      htmlFor="account-settings-upload-image"
                    >
                      Upload New Photo
                      <input
                        hidden
                        type="file"
                        onChange={onChange}
                        accept="image/png, image/jpeg"
                        id="account-settings-upload-image"
                      />
                    </ButtonStyled>
                    <ResetButtonStyled
                      color="error"
                      variant="outlined"
                      onClick={() => setImgSrc("/images/avatars/1.png")}
                    >
                      Reset
                    </ResetButtonStyled>
                    <Typography variant="body2" sx={{ marginTop: 5 }}>
                      Allowed PNG or JPEG. Max size of 800K.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  placeholder="username"
                  value={userInfo?.username || ""}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  placeholder="fullname"
                  value={userInfo?.fullName || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder="example123@gmail.com"
                  value={userInfo?.email || ""}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label="Role" defaultValue="admin">
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="maintainer">Maintainer</MenuItem>
                <MenuItem value="subscriber">Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select label="Status" defaultValue="active">
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="phone"
                  label="Phone Number"
                  placeholder="0123xxxxxx"
                  value={userInfo?.phone || ""}
                />
              </Grid>

              {openAlert ? (
                <Grid item xs={12} sx={{ mb: 3 }}>
                  <Alert
                    severity="warning"
                    sx={{ "& a": { fontWeight: 400 } }}
                    action={
                      <IconButton
                        size="small"
                        color="inherit"
                        aria-label="close"
                        onClick={() => setOpenAlert(false)}
                      >
                        <Close />
                      </IconButton>
                    }
                  >
                    <AlertTitle>
                      Your email is not confirmed. Please check your inbox.
                    </AlertTitle>
                    <Link
                      href="/"
                      onClick={(e: SyntheticEvent) => e.preventDefault()}
                    >
                      Resend Confirmation
                    </Link>
                  </Alert>
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <Button variant="contained" sx={{ marginRight: 3.5 }}>
                  Save Changes
                </Button>
                <Button type="reset" variant="outlined" color="secondary">
                  Reset
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </div>
    </AuthGuard>
  );
};
export default Account;
