import * as React from "react";
import { styled } from "@mui/material/styles";
import { BRAND } from "../theme/colors";
import { useTranslation } from 'react-i18next';
import {
  Box, Divider, Paper, Stack, Button, Typography, CircularProgress,
  Card, CardContent, CardActions
} from '@mui/material';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import academy from '../assets/RappsIcons/academyLogo.svg';
// import { AcademyClass } from '../services/academyService';
import { AcademyClass, AcademyParams } from '../hooks/useGetAcademy';

//Props from CreateGetaway
interface AcademyScheduleProps {
  schedules: AcademyClass[];
  //schedules: any[];
  loading: boolean;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  fetchAcademy: (params: AcademyParams) => void;
  searchParams: AcademyParams;
}

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
  backgroundColor: theme.palette.background.paper,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AcademySchedule({
  schedules,
  loading,
  selectedIds,
  setSelectedIds,
  fetchAcademy, searchParams
}: AcademyScheduleProps) {
  const { t } = useTranslation();
  const [showTable, setShowTable] = React.useState(false);
  // const [rows, setRows] = React.useState<AcademyRow[]>(initialRows);

  const handleToggleInclude = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShowTable = () => {
    setShowTable(true);
    fetchAcademy(searchParams);
  };

  // Conditional table rendering state
  // const handleIncludeChange = (id: number) => {
  //   setRows((prevRows) =>
  //     prevRows.map((row) =>
  //       row.id === id ? { ...row, included: !row.included } : row
  //     )
  //   );
  // };

  const handleResetTable = () => {
    // setRows(initialRows);
    setSelectedIds([]);
    setShowTable(false);
  };
  // 3. No mostrar el componente si no hay resultados ni fechas elegidas
  // if (!schedules || schedules.length === 0) {
  //   return null; // O un mensaje de "No hay horarios disponibles"
  // }

  return (
    <Box sx={{ width: '100%', margin: '25px 0' }}>
      <Divider textAlign="center" aria-hidden="true" sx={{ mb: 2 }}>
        <img src={academy} style={{ height: '36px' }} className="logo" alt="Racquets Academy Logo" />
      </Divider>

      {!showTable ? (
        <Card variant="outlined" sx={{
          p: 3, textAlign: 'center',
          bgcolor: '#F8F9FA', border: '1px dashed #bdbdbd'
        }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', color: BRAND.primary }}> {t('academy.enhance')} </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}> {t('academy.prompt')}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button startIcon={<CheckCircleOutlineIcon />} variant="contained"  size="large"
            onClick={handleShowTable}
            // onClick={() => setShowTable(true)}
            sx={{ px: 4, borderRadius: '20px', bgcolor: BRAND.primary, textTransform: 'none' }}
            > {t('academy.showSessions')}</Button>
          </CardActions>
        </Card>
      ) : (
      <>
        { loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress color="primary" />
            {/* <Typography sx={{ my: 2 }}>{t('common.loading')}...</Typography> */}
          </Box>
        // ) : !schedules || schedules.length === 0 ? (
        //   <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 2 }}>
        //     {t('academy.noSchedules') || 'No se encontraron horarios para los filtros seleccionados.'}
        //   </Typography>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 2, color: BRAND.primary, fontWeight: 'bold' }}>
              {t('academy.selectSessions')}
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table aria-label="customized table" sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">{t('academy.weekday')}</StyledTableCell>
                    <StyledTableCell align="left">{t('academy.location')}</StyledTableCell>
                    <StyledTableCell align="left">{t('academy.trainer')}</StyledTableCell>
                    <StyledTableCell align="left">{t('academy.price')}</StyledTableCell>
                    <StyledTableCell align="center">{t('academy.include')}</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedules.map((row) => {
                    const isIncluded = selectedIds.includes(row.id);
                    return (
                      <StyledTableRow key={row.id}>
                        {/* <StyledTableCell component="th" scope="row"> */}
                        <StyledTableCell scope="row">
                          <Stack direction="column" spacing={0.5}>
                            <strong>{row.day || 'N/A'}</strong>
                            <span>{row.startTime} - {row.endTime}</span>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell scope="row"
                          // component="th"
                        >
                          <Stack direction="column" spacing={0.5}>
                            <strong>{row.location}</strong>
                            <span>{t('academy.court')}: {row.court}</span>
                          </Stack>
                        </StyledTableCell>
                        <StyledTableCell scope="row">
                          <span>{row.trainers}</span>
                        </StyledTableCell>
                        <StyledTableCell align="left" component="th" scope="row">
                          <Stack direction="column" spacing={0.5}>
                            <span>${row.price ?? 0}</span>
                            {/* <span>{row.price}$</span> */}
                            <span>{row.priceLabel}</span>
                          </Stack>
                        </StyledTableCell>
                        {/* <StyledTableCell align="center">
                          <input type="checkbox" id={`academyOption-${row.id}`}
                            checked={row.included}
                            onChange={() => handleIncludeChange(row.id)}
                          />
                        </StyledTableCell> */}
                        <StyledTableCell align="center">
                          <Button
                            variant={isIncluded ? "contained" : "outlined"}
                            size="small"
                            onClick={() => handleToggleInclude(row.id)}
                            sx={{
                              borderRadius: '20px',
                              textTransform: 'none',
                              bgcolor: isIncluded ? BRAND.green : 'transparent',
                              color: isIncluded ? BRAND.navy : BRAND.primary,
                              borderColor: BRAND.primary,
                              '&:hover': {
                                bgcolor: isIncluded ? BRAND.primary : 'rgba(0,0,0,0.04)',
                                color: isIncluded ? BRAND.white : BRAND.primary,
                              }
                            }}
                          >
                            {isIncluded ? t('academy.included') : t('academy.include')}
                          </Button>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* Hide table and reset */}
            <Button  variant="contained" startIcon={<DeleteIcon />}
              onClick={handleResetTable} color="primary"
              sx={{
                mt:2, px: 4,
                bgcolor: BRAND.primary,
                textTransform: 'none',
                borderRadius: '20px',
              }}
            > {t('academy.removeSelection')}
            </Button>
          </>
        )}
      </>
    )}
    </Box>
  );
}