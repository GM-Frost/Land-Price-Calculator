'use client';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { PlotEntry } from "../layout/WorkspaceProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type PlotTableProps = {
  rows: PlotEntry[];
  onDeleteRow: (id: string) => void;
};

export default function PlotTable({ rows, onDeleteRow }: PlotTableProps) {
  return (
    <div style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "auto",
          boxShadow: "none",
          borderRadius: 3,
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Plot</StyledTableCell>
            <StyledTableCell>Plot Name</StyledTableCell>
            <StyledTableCell>Plot Description</StyledTableCell>
            <StyledTableCell align="right">Plot Size</StyledTableCell>
            <StyledTableCell align="right">Plot Unit</StyledTableCell>
            <StyledTableCell>Price Set</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell colSpan={8} align="center">
                No plots added yet.
              </StyledTableCell>
            </StyledTableRow>
          ) : null}
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.plotNumber}
              </StyledTableCell>
              <StyledTableCell>{row.plotName}</StyledTableCell>
              <StyledTableCell>{row.plotDesc}</StyledTableCell>
              <StyledTableCell align="right">{row.plotSize}</StyledTableCell>
              <StyledTableCell align="right">{row.plotUnit}</StyledTableCell>
              <StyledTableCell>{row.priceSetLabel ?? "-"}</StyledTableCell>
              <StyledTableCell align="right">{row.plotAmount}</StyledTableCell>
              <StyledTableCell align="center">
                <button
                  type="button"
                  onClick={() => onDeleteRow(row.id)}
                  aria-label={`Delete ${row.plotName}`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base font-medium text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-700"
                >
                  ×
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
