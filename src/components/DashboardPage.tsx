// src/pages/DashboardPage.tsx

import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
// Import all three service functions
import { getAttendanceStatus } from "../api/services/attendanceService";
import { getEmotionStatus } from "../api/services/emotionService";
import { getStudentOverallStatus } from "../api/services/studentService";
import type { StudentOverallStatus } from "../types/api";

// --- HELPER COMPONENTS ---
const AttendanceProgress = ({ value }: { value: number }) => {
  const color = value > 90 ? "success" : value > 70 ? "warning" : "error";
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={value}
          color={color}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

// --- MAIN DASHBOARD PAGE COMPONENT ---
export const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const [combinedData, setCombinedData] = useState<Map<number, any>>(new Map());
  const [studentsData, setStudentsData] = useState<StudentOverallStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Fetch all three datasets in parallel
        const [attendanceRes, emotionsRes, studentsRes] = await Promise.all([
          getAttendanceStatus(),
          getEmotionStatus(),
          getStudentOverallStatus(),
        ]);

        // Merge the class data based on classID
        const mergedData = new Map<number, any>();
        attendanceRes.forEach((item) => {
          mergedData.set(item.classID, {
            ...mergedData.get(item.classID),
            ...item,
          });
        });
        emotionsRes.forEach((item) => {
          mergedData.set(item.classID, {
            ...mergedData.get(item.classID),
            ...item,
          });
        });

        setCombinedData(mergedData);
        setStudentsData(studentsRes);
        setError(null);
      } catch (err) {
        setError("Failed to fetch dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const { chartData, allEmotionKeys } = useMemo(() => {
    const data = Array.from(combinedData.values()).map((c) => ({
      name: `Class ${c.classID}`,
      "Attendance Rate": c.attendanceRate,
      ...c.emotionDistribution,
    }));

    const emotionKeys = new Set<string>();
    data.forEach((d) => {
      Object.keys(d).forEach((key) => {
        if (key !== 'name' && key !== 'Attendance Rate') {
          emotionKeys.add(key);
        }
      });
    });

    return { chartData: data, allEmotionKeys: Array.from(emotionKeys) };
  }, [combinedData]);

  const emotionColors: { [key: string]: string } = {
    happy: theme.palette.success.main,      // Green
    sad: theme.palette.error.main,          // Red
    angry: '#8B0000',                       // Dark Red (more distinct)
    fear: '#FF8C00',                        // Dark Orange (more distinct)
    disgust: '#FFA500',                     // Orange (more distinct)
    surprise: theme.palette.info.main,      // Blue
    neutral: theme.palette.grey[600],       // Darker Gray
  };

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 4 }}>
      <Paper
        variant="outlined"
        sx={{ p: 3, borderRadius: 2 }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
          >
            Class Performance Overview
          </Typography>
        </Box>
        {loading ? (
          <Box
            sx={{
              height: 300,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
              >
                Attendance Rate (%)
              </Typography>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar
                    dataKey="Attendance Rate"
                    fill={theme.palette.primary.main}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Box>
              <Typography
                variant="h6"
                gutterBottom
              >
                Emotion Distribution (%)
              </Typography>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {allEmotionKeys.map((key) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      stackId="a"
                      fill={emotionColors[key] || theme.palette.grey[400]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </>
        )}
      </Paper>

      {/* SECTION 2: Student Overview (Live Data) */}
      <Paper
        variant="outlined"
        sx={{ p: 3, borderRadius: 2 }}
      >
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          Student Overview
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Class Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    align="center"
                  >
                    <Typography color="error">
                      Could not load student data.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                studentsData.map((student) => {
                  const attendancePercent =
                    student.totalClasses > 0
                      ? (student.classesAttended / student.totalClasses) * 100
                      : 0;
                  return (
                    <TableRow key={student.studentID}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar sx={{ mr: 2 }}>
                            {student.studentID.charAt(0)}
                          </Avatar>
                          <Typography fontWeight="medium">
                            {student.studentID}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <AttendanceProgress value={attendancePercent} />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
