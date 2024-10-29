import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../service';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Button, ButtonGroup } from '@mui/material'; // Import Material-UI Button components

const Piechart = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const GetEmployees = async () => {
        try {
            const data = await fetchEmployees();
            setEmployees(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetEmployees();
    }, []);

    // Count employees by department
    const departmentData = employees.reduce((acc, employee) => {
        const department = employee.department;
        if (department) {
            acc[department] = (acc[department] || 0) + 1;
        }
        return acc;
    }, {});

    // Transform data for the chart based on selected department or all
    const chartData = selectedDepartment === "All" || !selectedDepartment
        ? Object.keys(departmentData).map(dept => ({
            name: dept,
            value: departmentData[dept] || 0
        }))
        : [{ name: selectedDepartment, value: departmentData[selectedDepartment] || 0 }];

    // Define colors for each department slice
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

    const handleDepartmentClick = (department) => {
        setSelectedDepartment(department);
    };

    return (
        <div style={{padding:"30px"}}>
            <h3>Employee Distribution by Department</h3>
            
            {/* Buttons to select a department */}
            <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginBottom: 2 }}>
                <Button onClick={() => handleDepartmentClick("All")}>All</Button>
                <Button onClick={() => handleDepartmentClick("Engineering")}>Engineering</Button>
                <Button onClick={() => handleDepartmentClick("Marketing")}>Marketing</Button>
                <Button onClick={() => handleDepartmentClick("Sales")}>Sales</Button>
                <Button onClick={() => handleDepartmentClick("Human Resources")}>Human Resources</Button>
                <Button onClick={() => handleDepartmentClick("Finance")}>Finance</Button>
            </ButtonGroup>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <PieChart width={400} height={400}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            )}
        </div>
    );
};

export default Piechart;
