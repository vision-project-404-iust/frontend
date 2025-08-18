// src/pages/ClassesPage.tsx

import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Avatar,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// Import the service and types
import { getClassDetailStatus } from "../api/services/classService";
import type { ClassDetailStatusResponse, ClassDetail } from "../types/api";

// --- HELPER COMPONENTS ---
const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <Card
    variant="outlined"
    sx={{ flex: 1 }}
  >
    <CardContent>
      <Typography
        color="text.secondary"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        component="div"
        fontWeight="bold"
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

// --- MAIN CLASSES PAGE COMPONENT ---
export const ClassesPage: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [classesData, setClassesData] = useState<ClassDetailStatusResponse>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getClassDetailStatus();
        setClassesData(data);
        if (Object.keys(data).length > 0) {
          setSelectedClassId(Object.keys(data)[0]);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch class details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const classIds = useMemo(() => {
    return Object.keys(classesData).filter((id) =>
      id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, classesData]);

  const selectedClassData: ClassDetail | null = selectedClassId
    ? classesData[selectedClassId]
    : null;

  const emotionChartData = useMemo(() => {
    if (!selectedClassData) return [];
    return Object.entries(selectedClassData.emotionDistribution).map(
      ([name, value]) => ({ name, value })
    );
  }, [selectedClassData]);

  return (
    <Paper
      variant="outlined"
      sx={{ display: "flex", height: "100%", borderRadius: 2 }}
    >
      {/* LEFT PANE: Class List */}
      <Box
        sx={{
          width: 280,
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 2, flexShrink: 0 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search classes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  color="action"
                  sx={{ mr: 1 }}
                />
              ),
            }}
          />
        </Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {classIds.map((id) => (
              <ListItem
                key={id}
                disablePadding
              >
                <ListItemButton
                  selected={selectedClassId === id}
                  onClick={() => setSelectedClassId(id)}
                >
                  <ListItemText primary={`Class ${id}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* RIGHT PANE: Class Details */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography color="error">{error}</Typography>
          </Box>
        ) : !selectedClassData ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              color="text.secondary"
            >
              Select a class to view details
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ p: 3, flexShrink: 0 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
              >
                Class {selectedClassId}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Overall Class Summary
              </Typography>
              <Stack
                direction="row"
                spacing={3}
                sx={{ mb: 4 }}
              >
                <StatCard
                  title="Attendance Rate"
                  value={`${selectedClassData.attendanceRate}%`}
                />
                <StatCard
                  title="Present Students"
                  value={selectedClassData.presentStudents}
                />
              </Stack>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Emotion Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={emotionChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={80}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill={theme.palette.primary.main}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: "auto", px: 3, pb: 3 }}>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 2, mt: 4 }}
              >
                Student Breakdown
              </Typography>
              <TableContainer
                component={Paper}
                variant="outlined"
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student ID</TableCell>
                      <TableCell>Frames Attended</TableCell>
                      <TableCell>Emotion Summary</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(selectedClassData.studentBreakdown).map(
                      ([studentId, details]) => (
                        <TableRow key={studentId}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar sx={{ mr: 1.5, width: 32, height: 32 }}>
                                {studentId.charAt(0)}
                              </Avatar>
                              {studentId}
                            </Box>
                          </TableCell>
                          <TableCell>{details.framesAttended}</TableCell>
                          <TableCell>
                            {Object.entries(details.emotionSummary)
                              .map(([key, val]) => `${key}: ${val}`)
                              .join(", ")}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};
