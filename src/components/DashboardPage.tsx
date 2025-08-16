// src/pages/DashboardPage.tsx

import React, { useMemo } from "react"; // Removed useState
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
  Chip,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- TYPE DEFINITIONS ---
interface ClassData {
  classID: number;
  className: string;
  total_students: number;
  present_students: number;
  absent_students: number;
  attendance_rate: number;
  emotion_distribution: {
    happy: number;
    neutral: number;
    confused: number;
  };
}

interface StudentData {
  id: string;
  name: string;
  avatarUrl?: string;
  status: "Excellent" | "Good" | "Needs Improvement";
  attendance: number;
}

// --- MOCK DATA ---
const classesData: ClassData[] = [
  {
    classID: 101,
    className: "Algebra 101",
    total_students: 25,
    present_students: 25,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 500, neutral: 1200, confused: 150 },
  },
  {
    classID: 102,
    className: "History 202",
    total_students: 30,
    present_students: 27,
    absent_students: 3,
    attendance_rate: 90.0,
    emotion_distribution: { happy: 800, neutral: 1000, confused: 50 },
  },
  {
    classID: 103,
    className: "Physics 301",
    total_students: 22,
    present_students: 20,
    absent_students: 2,
    attendance_rate: 90.91,
    emotion_distribution: { happy: 400, neutral: 900, confused: 400 },
  },
  {
    classID: 104,
    className: "Literature 404",
    total_students: 28,
    present_students: 28,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 950, neutral: 1500, confused: 20 },
  },
  {
    classID: 105,
    className: "Calculus II",
    total_students: 26,
    present_students: 24,
    absent_students: 2,
    attendance_rate: 92.31,
    emotion_distribution: { happy: 600, neutral: 1100, confused: 250 },
  },
  {
    classID: 106,
    className: "World Geography",
    total_students: 32,
    present_students: 32,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 1200, neutral: 1300, confused: 30 },
  },
  {
    classID: 107,
    className: "Creative Writing",
    total_students: 20,
    present_students: 18,
    absent_students: 2,
    attendance_rate: 90.0,
    emotion_distribution: { happy: 700, neutral: 800, confused: 100 },
  },
  {
    classID: 108,
    className: "Chemistry 101",
    total_students: 29,
    present_students: 25,
    absent_students: 4,
    attendance_rate: 86.21,
    emotion_distribution: { happy: 550, neutral: 1000, confused: 350 },
  },
  {
    classID: 109,
    className: "Art History",
    total_students: 24,
    present_students: 24,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 900, neutral: 1200, confused: 40 },
  },
  {
    classID: 110,
    className: "Computer Science",
    total_students: 35,
    present_students: 33,
    absent_students: 2,
    attendance_rate: 94.29,
    emotion_distribution: { happy: 1100, neutral: 1600, confused: 180 },
  },
  {
    classID: 111,
    className: "Biology 210",
    total_students: 27,
    present_students: 26,
    absent_students: 1,
    attendance_rate: 96.3,
    emotion_distribution: { happy: 850, neutral: 1150, confused: 90 },
  },
  {
    classID: 112,
    className: "Economics 101",
    total_students: 31,
    present_students: 28,
    absent_students: 3,
    attendance_rate: 90.32,
    emotion_distribution: { happy: 750, neutral: 1300, confused: 220 },
  },
  {
    classID: 113,
    className: "Psychology 101",
    total_students: 33,
    present_students: 33,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 1300, neutral: 1700, confused: 60 },
  },
  {
    classID: 114,
    className: "Sociology 201",
    total_students: 28,
    present_students: 25,
    absent_students: 3,
    attendance_rate: 89.29,
    emotion_distribution: { happy: 650, neutral: 1050, confused: 300 },
  },
  {
    classID: 115,
    className: "Music Theory",
    total_students: 18,
    present_students: 18,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 800, neutral: 700, confused: 20 },
  },
  {
    classID: 116,
    className: "Statistics 300",
    total_students: 25,
    present_students: 22,
    absent_students: 3,
    attendance_rate: 88.0,
    emotion_distribution: { happy: 450, neutral: 950, confused: 450 },
  },
  {
    classID: 117,
    className: "Philosophy 101",
    total_students: 29,
    present_students: 29,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 1000, neutral: 1400, confused: 70 },
  },
  {
    classID: 118,
    className: "French Language",
    total_students: 21,
    present_students: 20,
    absent_students: 1,
    attendance_rate: 95.24,
    emotion_distribution: { happy: 700, neutral: 900, confused: 80 },
  },
  {
    classID: 119,
    className: "Spanish Language",
    total_students: 23,
    present_students: 21,
    absent_students: 2,
    attendance_rate: 91.3,
    emotion_distribution: { happy: 750, neutral: 950, confused: 120 },
  },
  {
    classID: 120,
    className: "Physical Education",
    total_students: 34,
    present_students: 34,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 1500, neutral: 1200, confused: 10 },
  },
  {
    classID: 121,
    className: "Marketing 101",
    total_students: 30,
    present_students: 28,
    absent_students: 2,
    attendance_rate: 93.33,
    emotion_distribution: { happy: 900, neutral: 1300, confused: 150 },
  },
  {
    classID: 122,
    className: "Business Law",
    total_students: 27,
    present_students: 27,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 950, neutral: 1250, confused: 50 },
  },
  {
    classID: 123,
    className: "Intro to Engineering",
    total_students: 26,
    present_students: 23,
    absent_students: 3,
    attendance_rate: 88.46,
    emotion_distribution: { happy: 600, neutral: 1000, confused: 380 },
  },
  {
    classID: 124,
    className: "Digital Arts",
    total_students: 22,
    present_students: 22,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 1000, neutral: 900, confused: 30 },
  },
];

const studentsData: StudentData[] = [
  { id: "S001", name: "Alex Johnson", status: "Excellent", attendance: 98 },
  { id: "S002", name: "Maria Garcia", status: "Excellent", attendance: 100 },
  { id: "S003", name: "Chen Wei", status: "Needs Improvement", attendance: 55 },
  { id: "S004", name: "Emily Carter", status: "Good", attendance: 85 },
  { id: "S005", name: "David Lee", status: "Good", attendance: 91 },
  {
    id: "S006",
    name: "Fatima Al-Sayed",
    status: "Needs Improvement",
    attendance: 62,
  },
];

// --- HELPER FUNCTIONS & COMPONENTS ---
const StatusChip = ({ status }: { status: StudentData["status"] }) => {
  const color = {
    Excellent: "success",
    Good: "warning",
    "Needs Improvement": "error",
  }[status] as "success" | "warning" | "error";

  return (
    <Chip
      label={status}
      color={color}
      size="small"
      sx={{ fontWeight: "bold" }}
    />
  );
};

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

  // The comparison data now includes all classes by default.
  const comparisonData = useMemo(() => {
    return classesData.map((c) => ({
      name: c.className,
      "Attendance Rate": c.attendance_rate,
      ...c.emotion_distribution,
    }));
  }, []); // The dependency array is empty because classesData is constant.

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 4 }}>
      {/* SECTION 1: Class Performance Comparison */}
      <Paper
        variant="outlined"
        sx={{ p: 3, borderRadius: 2 }}
      >
        {/* The Autocomplete component has been removed for a cleaner header. */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Attendance Rate
          </Typography>
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={comparisonData}
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
      </Paper>
      <Paper
        variant="outlined"
        sx={{ p: 3, borderRadius: 2 }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            Emotion Distribution
          </Typography>
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={comparisonData}
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
              <Bar
                dataKey="happy"
                stackId="a"
                fill={theme.palette.success.main}
              />
              <Bar
                dataKey="neutral"
                stackId="a"
                fill={theme.palette.warning.main}
              />
              <Bar
                dataKey="confused"
                stackId="a"
                fill={theme.palette.error.main}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* SECTION 2: Student Overview */}
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
          <Table
            sx={{ minWidth: 650 }}
            aria-label="student overview table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell align="center">Overall Status</TableCell>
                <TableCell>Attendance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentsData.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar sx={{ mr: 2, bgcolor: "primary.light" }}>
                        {student.name.charAt(0)}
                      </Avatar>
                      <Typography
                        variant="body1"
                        fontWeight="medium"
                      >
                        {student.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <StatusChip status={student.status} />
                  </TableCell>
                  <TableCell>
                    <AttendanceProgress value={student.attendance} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
