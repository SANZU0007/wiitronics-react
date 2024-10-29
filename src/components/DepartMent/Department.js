import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Grid,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { fetchDepartments, fetchDepartmentsPost, fetchDepartmentsEdit } from '../service';
import AddDepartmentForm from './AddDepartmentForm';
import EditDepartmentForm from './EditDepartmentForm.js';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDepartments();
  }, []);

  const handleAdd = async (newDepartment) => {
    try {
      await fetchDepartmentsPost(newDepartment);
      setPostSuccess(true);
      const updatedDepartments = await fetchDepartments();
      setDepartments(updatedDepartments);
    } catch (err) {
      setPostError(err.message);
    }
  };

  const handleEdit = async (updatedDepartment) => {
    try {
      await fetchDepartmentsEdit(updatedDepartment, selectedDepartment.id);
      setPostSuccess(true);
      const updatedDepartments = await fetchDepartments();
      setDepartments(updatedDepartments);
    } catch (err) {
      setPostError(err.message);
    }
  };

  const openAddDialog = () => {
    setIsEditing(false);
    setSelectedDepartment(null);
    setOpenDialog(true);
  };

  const openEditDialog = (department) => {
    setIsEditing(true);
    setSelectedDepartment(department);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPostError(null);
    setPostSuccess(false);
  };

  if (loading) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
  if (error) return <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>Error: {error}</Typography>;

  return (
    <Box sx={{ maxWidth: '1000px', margin: 'auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Departments
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={openAddDialog}
        sx={{ marginTop: 3, marginBottom: 4, display: 'block', mx: 'auto' }}
      >
        Add Department
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          {isEditing ? 'Edit Department' : 'Add New Department'}
        </DialogTitle>
        <DialogContent>
          {postError && (
            <Alert severity="error" onClose={() => setPostError(null)} sx={{ my: 2 }}>
              {postError}
            </Alert>
          )}
          {postSuccess && (
            <Alert severity="success" onClose={() => setPostSuccess(false)} sx={{ my: 2 }}>
              {isEditing ? 'Department updated successfully!' : 'Department added successfully!'}
            </Alert>
          )}

          {isEditing ? (
            <EditDepartmentForm
              department={selectedDepartment}
              onSubmit={handleEdit}
              onClose={handleDialogClose}
            />
          ) : (
            <AddDepartmentForm
              onSubmit={handleAdd}
              onClose={handleDialogClose}
            />
          )}
        </DialogContent>
       
      </Dialog>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {departments.map((dept) => (
          <Grid item xs={12} sm={6} md={4} key={dept.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                  {dept.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  {dept.description}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => openEditDialog(dept)} color="primary" sx={{ marginLeft: 'auto' }}>
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Department;
