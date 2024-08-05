import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [vendors, setVendors] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = Cookies.get('token'); // Retrieve the token from the cookie
        const response = await axios.get('https://vendoradminbackend.onrender.com/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleDelete = (id) => {
    setVendors((prevVendors) => prevVendors.filter((vendor) => vendor._id !== id));
  };

  const handleBlock = (id) => {
    alert(`Vendor with ID ${id} has been blocked.`);
  };

  const columns = [
    { field: "id", headerName: "Vendor ID", flex: 1 },
    { field: "name", headerName: "Vendor Name", flex: 1 },
    { field: "businessName", headerName: "Business Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleBlock(params.row.id)}
          >
            Block
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Vendors" subtitle="List of Contacts for Future Reference" />
     
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: colors.grey[100],
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={vendors.map((vendor) => ({ ...vendor, id: vendor._id }))}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
