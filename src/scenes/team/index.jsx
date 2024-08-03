import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = (id) => {
    // Handle delete functionality
    console.log(`Deleted row with id: ${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows = [
    { id: 1, name: "Dhanush", age: 22, phone: "123-456-7890", email: "dhanush@example.com", designation: "Project Lead", access: "admin" },
    { id: 2, name: "Praveen", age: 24, phone: "234-567-8901", email: "praveen@example.com", designation: "Backend Developer", access: "manager" },
    { id: 3, name: "Sanjesh", age: 23, phone: "345-678-9012", email: "sanjesh@example.com", designation: "Frontend Developer", access: "user" },
    { id: 4, name: "Druva", age: 25, phone: "456-789-0123", email: "druva@example.com", designation: "Backend Developer", access: "manager" },
    { id: 5, name: "Bhargav", age: 21, phone: "567-890-1234", email: "bhargav@example.com", designation: "Backend Developer", access: "user" },
    { id: 6, name: "Azaad", age: 20, phone: "678-901-2345", email: "azaad@example.com", designation: "Frontend Developer", access: "user" },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
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
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
