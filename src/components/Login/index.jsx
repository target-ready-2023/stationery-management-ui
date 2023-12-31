import * as React from 'react';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { styled } from '@mui/material/styles';
import bgimg from "../../images/Login_image2.jpg";
import Stack from "@mui/material/Stack";
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Logo from "../Logo";

const instance = axios.create({

  baseURL: 'http://localhost:8080/inventory/v1'

});

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#c11d1d',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#c11d1d',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: ' light grey',
    },
    '&:hover fieldset': {
      borderColor: 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c11d1d',
    },
  },
});

const Login = ({ setToken }) => {
  const [isStudent, setIsStudent] = useState(false);
  const handleToggleUserType = () => {
    setIsStudent((IsStudent) => !IsStudent);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const tokenType = isStudent ? "student" : "admin";
    if(tokenType=="admin"){
    instance.post('admin/login',
      { "adminEmail": data.get("email"), "adminPassword": data.get("password") })
      .then(function (response) {
        setToken({ token: "admin" });
        sessionStorage.setItem("name", response.data.admin.adminName)
        sessionStorage.setItem("id", response.data.admin.adminId)
      })
      .catch(function (response) {
        console.log("not admin => " + response);});
      }else{
        instance.post('/student/login ',
          { "studentEmail": data.get("email"), "studentPassword": data.get("password") })
          .then(function (response) {
            setToken({ token: "student" });
            sessionStorage.setItem("name", response.data.student.studentName)
            sessionStorage.setItem("id", response.data.student.studentId)
          })
          .catch(function (response) {
            console.log("not student => " + response);
            alert("The credentials do not match. Please try again");
          });
        }

  };


  const boxstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "70%",
    bgcolor: "white",
    boxShadow: 24,
  };

  const center = {
    position: "relative",
    top: "50%",
    left: "37%",
  };

  return (
    <>
      <header className="App-header">
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: "0px", marginLeft: "20px" }}>
          <Box sx={{ marginRight: "20px" }}>
            <Logo />
          </Box>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Stationery Management System
          </Typography>
        </Box>
      </header>
      <div
        style={{
          backgroundColor: "white",
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
        role="login_page"
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bgimg})`,
                  backgroundcolour: "white",
                  backgroundSize: "cover",
                  height: "70vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#FFFFFF",
                }}
                sx={{ borderLeft: 2, }}
              >

                <Container>
                  <Box sx={center} height='75px' />
                  <Box >
                  <Box display="flex" alignItems="center" justifyContent="center">
                      <Button
                          variant="contained"
                          size="large"
                          onClick={handleToggleUserType}
                          sx={{
                            bgcolor: "#F2F2F2",
                            color: "#000000",
                            textTransform: "none",
                            borderRadius: "30px",
                            fontSize: "18px",
                            "&:hover": {
                              backgroundColor: "#FFFFFF",
                            },
                          mb:'10px'
                          }
                          
                        }
                      >
                          {isStudent ? "Student Login" : "Admin Login"}
                      </Button>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Avatar
                        sx={{ ml: "0px", mb: "4px", bgcolor: "#000000" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <Typography color="black" component="h1" variant="h4">
                        Sign In
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 2 }}
                  >
                    <Grid container spacing={1}>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Username"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                        />
                      </Grid>
                      
                      <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth="true"
                          size="large"
                          sx={{
                            mt: "20px",
                            mr: "20px",
                            borderRadius: 28,
                            color: "#ffffff",
                            minWidth: "170px",
                            // backgroundColor: "#880808",
                          }}
                        >
                          Sign in
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <footer className="App-footer">
        <a >About US</a>
        <a >Contact US</a>
      </footer>
    </>
  );
}

export default Login;
