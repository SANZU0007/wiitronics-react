import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../../css/allEmpolyee.css"
import {
  CircularProgress,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewData from "./ViewData";
import { fetchEmployees } from "../service";
import { EditEmployee } from "./EditEmployee";
import PostEmployee from "./PostEmployee";

const AllEmployeeData = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [filterModel, setFilterModel] = useState({ items: [] }); // State for filter model

  // Pagination states
  const [pageSize, setPageSize] = useState(5); // Default rows per page
  const [page, setPage] = useState(0); // Current page

  const GetEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data); // Ensure 'data' is an array of objects
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetEmployees();
  }, []);

  if (loading) return <CircularProgress style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }} />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const columns = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleView(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
        </>
      ),
    },
    { field: "name", headerName: "Name", width: 200, filterable: true },
    { field: "aadhaarNumber", headerName: "Aadhaar#", width: 150, filterable: true },
    { field: "email", headerName: "Email", width: 200, filterable: true },
    { field: "phone", headerName: "Phone #", width: 150, filterable: true },
    { field: "department", headerName: "Department", width: 150, filterable: true },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 150, filterable: true },
    { field: "gender", headerName: "Gender", width: 150, filterable: true },
  ];

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditDialog(true);
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handlePostDialogClose = () => {
    setOpenPostDialog(false);
  };

  // Calculate the number of pages
  const numberOfPages = Math.ceil(employees.length / pageSize);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(0); // Reset to the first page on page size change
  };

  return (
    <div>

      <br></br>
      <Button style={{marginLeft:"20px"}} className="custom-margin" onClick={() => setOpenPostDialog(true)} variant="contained" color="primary">
        Create
      </Button>

      <Dialog open={openPostDialog} onClose={handlePostDialogClose}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <PostEmployee
            GetEmployees={GetEmployees}
            handlePostDialogClose={handlePostDialogClose}
          />
        </DialogContent>
      </Dialog>

      <div style={{ padding: "20px" }}>
        <DataGrid
          rows={employees.slice(page * pageSize, page * pageSize + pageSize)} // Displaying only the rows for the current page
          columns={columns}
       
          disableSelectionOnClick
        
   
          filterModel={filterModel} // Add filter model to DataGrid
          onFilterModelChange={(model) => setFilterModel(model)} // Update filter model state on change
        />

        {/* Manual Pagination Controls */}
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <Button
              onClick={() => handlePageChange(null, Math.max(0, page - 1))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <span>
              Page {page + 1} of {numberOfPages}
            </span>
            <Button
              onClick={() => handlePageChange(null, Math.min(numberOfPages - 1, page + 1))}
              disabled={page >= numberOfPages - 1}
            >
              Next
            </Button>
          </div>
          {/* <div>
            <label>
              Rows per page:
              <select value={pageSize} onChange={handlePageSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </label>
          </div> */}
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          <ViewData selectedEmployee={selectedEmployee} />
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <EditEmployee
            GetEmployees={GetEmployees}
            handleCloseEditDialog={handleCloseEditDialog}
            selectedEmployee={selectedEmployee}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllEmployeeData;
