import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function ProductPagination({page, handlePageChange, pagination}) {


  return (
      <Pagination count={pagination.total_pages} page={page} onChange={(event, value)=>handlePageChange(value)} />
  );
}