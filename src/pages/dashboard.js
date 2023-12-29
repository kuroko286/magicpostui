import { useState, useEffect } from "react";
import Head from "next/head";
import { TextField, MenuItem, Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewSucceedOrders } from "src/sections/overview/overview-succeed-orders";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewFailedOrders } from "src/sections/overview/overview-failed-orders";
import { OverviewIncomingOrders } from "src/sections/overview/overview-incoming-orders";
import { OverviewOutgoingOrders } from "src/sections/overview/overview-outgoing-orders";
import { useAuth } from "src/hooks/use-auth";

const fetchStats = async (location) => {
  let url = `http://localhost:8080/api/v1/orders/statistic`;
  console.log(location);
  if (location?.startsWith("TSP")) {
    url = `http://localhost:8080/api/v1/orders/statistic/transaction/${location}`;
  }
  if (location?.startsWith("GRP")) {
    url = `http://localhost:8080/api/v1/orders/statistic/gathering/${location}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  const data = await response.json();
  return data;
};

const fetchLocations = async () => {
  const response = await fetch(`http://localhost:8080/api/v1/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  const data = await response.json();
  return data;
};

const Page = () => {
  const [stats, setStats] = useState({
    succeed: "",
    failed: "",
    // ongoing: "",
    incoming: "",
    outgoing: "",
    // num: [],
    // type: {
    //   document: "",
    //   goods: "",
    // },
    latestOrders: [],
    // latestTransfers: [],
  });

  const { user } = useAuth();

  const [selectedLocation, setSelectedLocation] = useState(user?.location);
  const [locations, setLocations] = useState([]);

  const fetchData = async () => {
    const lcs = await fetchLocations();
    // console.log(lcs);
    setLocations(lcs);
    const data = await fetchStats(selectedLocation);
    setStats(data);
  };

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      setSelectedLocation(user?.location);
    } else {
      setSelectedLocation("");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedLocation]);

  return (
    <>
      <Head>
        <title>Tổng quan | MagicPost</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={12} lg={12}>
              <TextField
                select={user?.role === "ADMIN"}
                label="Địa điểm"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                sx={{ minWidth: 120, maxWidth: 120, float: "right" }}
                SelectProps={{
                  MenuProps: {
                    style: { maxHeight: 250 },
                  },
                }}
                InputProps={{ readOnly: user?.role !== "ADMIN" }}
              >
                <MenuItem key="" value="">
                  - Tất cả -
                </MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {user?.role !== "Transactor" && (
              <Grid xs={12} sm={6} lg={3}>
                <OverviewIncomingOrders
                  positive
                  sx={{ height: "100%" }}
                  value={`${stats?.incoming || 0}`}
                  transform={selectedLocation?.includes("E")}
                />
              </Grid>
            )}
            {user?.role !== "Transactor" && (
              <Grid xs={12} sm={6} lg={3}>
                <OverviewOutgoingOrders
                  positive
                  sx={{ height: "100%" }}
                  value={`${stats?.outgoing || 0}`}
                  transform={selectedLocation?.includes("E")}
                />
              </Grid>
            )}
            <Grid xs={12} sm={6} lg={user?.role === "Transactor" ? 4 : 3}>
              <OverviewSucceedOrders
                positive
                sx={{ height: "100%" }}
                value={`${stats?.succeed || 0}`}
                transform={selectedLocation?.includes("E")}
              />
            </Grid>
            {!selectedLocation?.includes("E") && (
              <Grid xs={12} sm={6} lg={user?.role === "Transactor" ? 4 : 3}>
                <OverviewFailedOrders
                  positive={false}
                  sx={{ height: "100%" }}
                  value={`${
                    selectedLocation?.includes("E") ? stats?.ongoing || 0 : stats?.failed || 0
                  }`}
                  transform={selectedLocation?.includes("E")}
                />
              </Grid>
            )}
            <Grid xs={12} md={12} lg={12}>
              <OverviewLatestOrders
                orders={
                  selectedLocation?.includes("E") ? stats?.latestTransfers : stats?.latestOrders
                }
                sx={{ height: "100%" }}
                transform={selectedLocation?.includes("E")}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
