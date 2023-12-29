import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { StaffsTable } from "src/sections/staff/staffs-table";
import { StaffsSearch } from "src/sections/staff/staffs-search";
import { applyPagination } from "src/utils/apply-pagination";
import { useAuth } from "src/hooks/use-auth";

const fetchStaffs = async (role, location, searchTerm) => {
  const response = await fetch(
    `http://localhost:8080/api/v1/users/offices/${location}?role=${role}&searchTerm=${searchTerm}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const useStaffs = (page, rowsPerPage, data) => {
  const paginatedData = useMemo(() => {
    return applyPagination(data, page, rowsPerPage);
  }, [page, rowsPerPage, data]);

  return paginatedData;
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [staffs, setStaffs] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStaffs("", user?.location, "");
      setStaffs(data);
    };

    fetchData();
  }, []);

  const paginatedStaffs = useStaffs(page, rowsPerPage, staffs);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  const handleSearch = async (searchCriteria) => {
    const { searchTerm, selectedRole, selectedLocation } = searchCriteria;
    const data = await fetchStaffs(selectedRole, selectedLocation, searchTerm);
    setStaffs(data);
    setPage(0); // Reset page to 0 when performing a new search
  };

  return (
    <>
      <Head>
        <title>Nhân viên | Magic Post</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Nhân viên</Typography>
              </Stack>
            </Stack>
            <StaffsSearch onSearch={handleSearch} />
            <StaffsTable
              count={staffs.length}
              items={paginatedStaffs}
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
