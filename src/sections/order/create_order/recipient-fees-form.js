// src/sections/orders/recipient-fees-form.js
import React, { useState, useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";

const RecipientFeesForm = ({ setFormData, formData, reset }) => {
  const [codShippingFee, setCodShippingFee] = useState("");
  const [additionalFee, setAdditionalFee] = useState("");
  const [totalFee, setTotalFee] = useState("");

  useEffect(() => {
    const cod = parseFloat(codShippingFee) || 0;
    const additional = parseFloat(additionalFee) || 0;

    // Calculate total cost including VAT
    const total = cod + additional;
    setTotalFee(`${parseInt(total)} VND`);

    setFormData({
      ...formData,
      recipientFeesCod: codShippingFee,
      recipientFeesAdditional: additionalFee,
    });
  }, [codShippingFee, additionalFee]);

  useEffect(() => {
    if (reset) {
      setCodShippingFee("");
      setAdditionalFee("");
    }
  }, [reset]);

  return (
    <Box sx={{ padding: 0 }}>
      <Typography variant="h6" gutterBottom>
        Thu của người nhận (VND)
      </Typography>
      <TextField
        fullWidth
        label="COD"
        value={codShippingFee}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, "");
          setCodShippingFee(e.target.value);
        }}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Thu khác"
        value={additionalFee}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, "");
          setAdditionalFee(e.target.value);
        }}
        sx={{ marginBottom: 2 }}
      />
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Tổng thu: {totalFee}
      </Typography>
    </Box>
  );
};

export default RecipientFeesForm;
