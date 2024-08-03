import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Dummy data
  const [vendors, setVendors] = useState([
    {
      id: 1,
      vendorName: "John Doe",
      businessName: "John's Catering",
      subscriptionFee: true,
      category: "Services",
      email: "john@example.com",
      contactNumber: "123-456-7890",
    },
    {
      id: 2,
      vendorName: "Jane Smith",
      businessName: "Smith Event Planning",
      subscriptionFee: false,
      category: "Services",
      email: "jane@example.com",
      contactNumber: "234-567-8901",
    },
    {
      id: 3,
      vendorName: "Alice Johnson",
      businessName: "Alice's Florals",
      subscriptionFee: true,
      category: "Products",
      email: "alice@example.com",
      contactNumber: "345-678-9012",
    },
    {
      id: 4,
      vendorName: "Bob Brown",
      businessName: "Bob's Rentals",
      subscriptionFee: false,
      category: "Products",
      email: "bob@example.com",
      contactNumber: "456-789-0123",
    },
    {
      id: 5,
      vendorName: "Charlie Davis",
      businessName: "Davis Music",
      subscriptionFee: true,
      category: "Services",
      email: "charlie@example.com",
      contactNumber: "567-890-1234",
    },
    {
      id: 6,
      vendorName: "Eve White",
      businessName: "White's Decorations",
      subscriptionFee: true,
      category: "Both",
      email: "eve@example.com",
      contactNumber: "678-901-2345",
    },
  ]);

  // Function to handle deleting a vendor
  const handleDelete = (id) => {
    setVendors((prevVendors) => prevVendors.filter((vendor) => vendor.id !== id));
  };

  // Function to handle blocking a vendor
  const handleBlock = (id) => {
    // You can add block functionality here
    alert(`Vendor with ID ${id} has been blocked.`);
  };

  const columns = [
    { field: "id", headerName: "Vendor ID", flex: 0.5 },
    { field: "vendorName", headerName: "Vendor Name", flex: 1 },
    { field: "businessName", headerName: "Business Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    {
      field: "subscriptionFee",
      headerName: "Subscription Fee",
      flex: 1,
      renderCell: (params) => (params.value ? "Paid" : "Unpaid"),
    },
    { field: "category", headerName: "Category", flex: 1 },
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
          rows={vendors}
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
