import React, { useState, useEffect } from 'react';
import { fetchSwaggerData } from '../swaggerService';
import { CircularProgress, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const SwaggerDataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchSwaggerData();
        setData(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Swagger API Data
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Column 1</TableCell>
              <TableCell>Column 2</TableCell>
              {/* Add more columns as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.sold}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default SwaggerDataComponent;