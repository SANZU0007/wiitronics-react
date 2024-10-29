import React, { useState } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableHead, TableRow, } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { employeeData } from '../service';


const AttendancePage = () => {
  const [startDate, setStartDate] = useState('2024-10-24');
  const [endDate, setEndDate] = useState('2024-10-31');

  const filteredData = employeeData.filter(emp => emp.date >= startDate && emp.date <= endDate);

  const dates = Array.from(new Set(filteredData.map(emp => emp.date))).sort();
  const attendanceByDate = dates.map(date => ({
    date,
    count: filteredData.filter(emp => emp.date === date).length
  }));

  const pieData = [{ name: 'Total Employees Present', value: filteredData.length }];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Attendance Page</Typography>
      
      <br></br>
      
      <Box display="flex" gap={2} alignItems="center">
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          fullWidth
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          fullWidth
        />
       
      </Box>

      <Box display="flex" gap={2} mt={3}>
        <Box flex={1}>
          <Typography variant="h6">Total Employees by Date</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceByDate}>
              <XAxis dataKey="date" tickFormatter={(tick) => format(new Date(tick), 'dd/MM')} />
              <YAxis domain={[0, 20]} />
              <Tooltip />
              <Bar dataKey="count" fill="#3f51b5" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box flex={1}>
          <Typography variant="h6">Total Attendance for Date Range</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#3f51b5"
                label
              >
                <Cell fill="#3f51b5" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box mt={3}>
        <Table style={{border:"1px solid black"}}>
          <TableHead>
            <TableRow>
              <TableCell>Employee Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Phone #</TableCell>
              <TableCell>date</TableCell>
              <TableCell>In Time</TableCell>
              <TableCell>Out Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department}</TableCell>
                <TableCell>{emp.phone}</TableCell>
                <TableCell>{emp.date}</TableCell>
                <TableCell>{emp.inTime}</TableCell>
                <TableCell>{emp.outTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default AttendancePage;
