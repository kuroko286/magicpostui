import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  Button,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const IndexPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tracking, setTracking] = React.useState();
  const [trackingId, setTrackingId] = React.useState("");

  const handleTracking = async () => {
    const response = await fetch(`http://localhost:8080/api/v1/orders/tracking/${trackingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.json();
    setTracking(data);
  };
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" color="white">
            Logistic App
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" href="/auth/login">
            Login
          </Button>
          <Button color="inherit" href="/dashboard">
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: "100%", overflow: "hidden", transition: "0.3s" }}>
        <Image
          src="/assets/images/hero.jpg"
          alt="Hero Image"
          layout="responsive"
          width={1920}
          height={1080}
        />
      </Box>
      <Box sx={{ my: 2, mx: 2, textAlign: isMobile ? "center" : "left", transition: "0.3s" }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Track your order
        </Typography>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} sm={10}>
            <TextField
              label="Order ID"
              fullWidth
              color="primary"
              sx={{ height: "100%" }}
              onChange={(e) => setTrackingId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: "100%" }}
              onClick={handleTracking}
            >
              Submit
            </Button>
          </Grid>
          {tracking && (
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Thời gian</TableCell>
                    <TableCell>Thông tin</TableCell>
                    <TableCell>Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tracking.deliveries?.map((item) => (
                    <TableRow key={item.dateCreated}>
                      <TableCell>{new Date(item.dateCreated).toLocaleDateString()}</TableCell>
                      <TableCell>{`Đơn hàng giao từ ${item.presentDes} đến ${item.nextDes}`}</TableCell>
                      <TableCell>{item.done ? "Đã xong" : "Đang vận chuyển"}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell>{tracking.id}</TableCell>
                    <TableCell>{tracking.status}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Box>
      <Box sx={{ my: 2, mx: 2, textAlign: isMobile ? "center" : "left", transition: "0.3s" }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary" textAlign={"center"}>
          Our Services
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="h2" gutterBottom color="primary">
              Fast Delivery
            </Typography>
            <Typography color="textSecondary">
              We provide fast and reliable delivery service.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="h2" gutterBottom color="primary">
              24/7 Support
            </Typography>
            <Typography color="textSecondary">
              Our support team is available 24/7 to assist you.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" component="h2" gutterBottom color="primary">
              Secure Payment
            </Typography>
            <Typography color="textSecondary">We ensure secure payment process.</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 2, mx: 2, textAlign: "center", transition: "0.3s" }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Contact Us
        </Typography>
        <TextField label="Name" variant="outlined" fullWidth color="primary" />
        <Box sx={{ my: 2 }} />
        <TextField label="Email" variant="outlined" fullWidth color="primary" />
        <Box sx={{ my: 2 }} />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          color="primary"
        />
        <Box sx={{ my: 2 }} />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Box>
      <Box sx={{ my: 2, mx: 2, textAlign: "center", transition: "0.3s" }}>
        <Typography color="textSecondary">© 2022 Company Name. All rights reserved.</Typography>
        <Typography color="textSecondary">123 Street, City, State, Country</Typography>
        <Typography color="textSecondary">Email: info@company.com</Typography>
        <Typography color="textSecondary">Phone: +1 234 567 890</Typography>
      </Box>
    </>
  );
};

export default IndexPage;
