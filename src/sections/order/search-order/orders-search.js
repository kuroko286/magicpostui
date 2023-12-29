import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  SvgIcon,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import PrinterIcon from "@heroicons/react/24/solid/PrinterIcon";
import { makeDeliveryReceipt } from "src/utils/make-delivery-receipt";

const OrderSearchSection = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState(router.query.orderId);
  const [order, setOrder] = useState(null);

  const vn_translate = {
    processing: "Đang xử lý",
    transferring: "Đang vận chuyển",
    shipping: "Đang giao hàng",
    done: "Đã hoàn thành",
    failed: "Thất bại",
    document: "Tài liệu",
    goods: "Hàng hóa",
  };

  const fetchOrderById = async (orderId) => {
    if (!orderId) {
      return null;
    }

    const response = await fetch(`http://localhost:8080/api/v1/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      // setDialogTitle("Thất bại");
      // setDialogMessage("Đơn hàng không tồn tại");
      // setDialogOpen(true);
      console.log(response);
      return null;
    }
  };

  const handleSearch = async () => {
    try {
      setOrder(null);
      const data = await fetchOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const handleIconClick = () => {
    makeDeliveryReceipt(order);
  };

  useEffect(() => {
    if (orderId) {
      handleSearch();
    }
  }, []);

  const isSmallScreen = useMediaQuery("(max-width: 400px)");

  return (
    <Box component="form" display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Tra cứu đơn hàng
      </Typography>

      <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
        <TextField
          label="Mã đơn hàng"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Tra cứu
        </Button>
      </Stack>

      {order && (
        <Paper elevation={3} sx={{ padding: 4, margin: [4, 4, 4, 4], boxShadow: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" align="center">
                {order.orderId}
                <IconButton onClick={handleIconClick}>
                  <SvgIcon color="action" fontSize="large">
                    <PrinterIcon />
                  </SvgIcon>
                </IconButton>
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Thông tin người gửi
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Họ tên: {order.senderName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điện thoại: {order.senderPhone}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Địa chỉ: {order.senderAddress}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Thông tin người nhận
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Họ tên: {order.recipientName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Điện thoại: {order.recipientPhone}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Địa chỉ: {order.recipientAddress}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Loại hàng gửi
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {vn_translate[order.type]}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Khối lượng (kg): {order.weight}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Cước:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Cước chính: {order.mainCharge}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Cước phụ: {order.subCharge}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                Tổng thu: {order.mainCharge + order.subCharge}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Thu của người nhận
              </Typography>
              <Typography variant="body2" color="textSecondary">
                COD: {order.cod}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Thu khác: {+order.recipientFees?.additional || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Tổng thu: {+order.cod + (order.recipientFees?.additional || 0)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default OrderSearchSection;
