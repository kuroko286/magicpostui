import {
  Container,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const AddOfficeForm = () => {
  const [officeData, setOfficeData] = useState({
    officeType: "Gathering",
    name: "",
    city: "",
    address: "",
    email: "",
    idBranch: "",
  });
  const [showIdBranch, setShowIdBranch] = useState(false);

  const handleChange = (event) => {
    setOfficeData({
      ...officeData,
      [event.target.name]: event.target.value,
    });
    console.log(officeData);
    if (event.target.name === "officeType" && event.target.value === "Transaction") {
      setShowIdBranch(true);
    } else if (event.target.name === "officeType" && event.target.value === "Gathering") {
      setShowIdBranch(false);
    }
  };

  // send data to localhost:8080
  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert officeData to JSON
    const jsonData = JSON.stringify(officeData);
    const url =
      officeData.officeType == "Transaction"
        ? "http://localhost:8080/api/v1/transaction-point"
        : "http://localhost:8080/api/v1/gathering-point";

    // Send data to localhost:8080
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error sending data:", error);
      });

    // Reset form fields
    setOfficeData({
      officeType: "Gathering",
      name: "",
      city: "",
      address: "",
      email: "",
      idBranch: "",
    });
    setShowIdBranch(false);
  };

  // using mui, create form with 5 fields, first field is radio button for office type (2 type: Gathering & Transaction), 4 text fields with email last, and 1 button
  return (
    <Container>
      <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
        <FormLabel component="legend">Office Type</FormLabel>
        <RadioGroup
          row
          aria-label="officeType"
          name="officeType"
          value={officeData.officeType}
          onChange={handleChange}
        >
          <FormControlLabel value="Gathering" control={<Radio />} label="Gathering" />
          <FormControlLabel value="Transaction" control={<Radio />} label="Transaction" />
        </RadioGroup>
      </FormControl>

      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        name="name"
        onChange={handleChange}
        style={{ marginBottom: "20px", width: "100%" }}
      />
      <TextField
        id="outlined-basic"
        label="City"
        variant="outlined"
        name="city"
        onChange={handleChange}
        style={{ marginBottom: "20px", width: "100%" }}
      />
      <TextField
        id="outlined-basic"
        label="Address"
        variant="outlined"
        name="address"
        onChange={handleChange}
        style={{ marginBottom: "20px", width: "100%" }}
      />
      {showIdBranch && (
        <TextField
          id="outlined-basic"
          label="idBranch"
          variant="outlined"
          name="idBranch"
          onChange={handleChange}
          style={{ marginBottom: "20px", width: "100%" }}
        />
      )}

      <Button variant="contained" style={{ width: "100%" }} onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

AddOfficeForm.getlayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddOfficeForm;
