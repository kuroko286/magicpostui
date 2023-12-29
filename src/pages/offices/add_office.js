import React from "react";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import AddOfficeForm from "src/sections/offices/add-office/add-office-form";

const AddStaff = () => {
  return (
    <>
      <Head>
        <title>Thêm văn phòng | Magic Post</title>
      </Head>
      <AddOfficeForm />
    </>
  );
};

AddStaff.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddStaff;
