// pages/orders/all_orders.js
import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AllOrdersSearch } from "src/sections/order/all-orders/all-orders-search";
import { OrdersTable } from "src/sections/order/all-orders/all-orders-table";
import { applyPagination } from "src/utils/apply-pagination";
import { useAuth } from "src/hooks/use-auth";
import { OfficesTable } from "src/sections/offices/all-offices/all-offices-table";

const fetchTransactionPoint = async () => {
  const response = await fetch(`http://localhost:8080/api/v1/transaction-point`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  const data = await response.json();

  return data;
};
const fetchGatheringPoint = async () => {
  const response = await fetch(`http://localhost:8080/api/v1/gathering-point`, {
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
  const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const gathering = await fetchGatheringPoint();
      const transaction = await fetchTransactionPoint();
      setPoints([...gathering, ...transaction]);
    };

    fetchData();
  }, []);

  const useOffices = (page, rowsPerPage, data) => {
    const paginatedData = useMemo(() => {
      return applyPagination(data, page, rowsPerPage);
    }, [page, rowsPerPage, data]);

    return paginatedData;
  };

  const paginatedOrders = useOffices(page, rowsPerPage, points);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Magic Post</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Văn Phòng</Typography>
              </Stack>
            </Stack>

            <OfficesTable
              count={points.length}
              items={paginatedOrders}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
