// src/pages/ClassesPage.tsx

import React, { useState, useMemo } from "react";
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
  Chip,
  Stack,
  Avatar,
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

// --- TYPE DEFINITIONS ---
interface ClassStudentDetail {
  studentID: string;
  studentName: string; // Assuming we can get the name
  status: "Engaged" | "Passive" | "Distracted" | "Neutral";
  emotion_summary: { [key: string]: number };
  frames_attended: number;
}

interface ClassData {
  classID: number;
  className: string;
  total_students: number;
  present_students: number;
  absent_students: number;
  attendance_rate: number;
  emotion_distribution: { [key: string]: number };
  students_list: ClassStudentDetail[];
}

// --- MOCK DATA ---
const classesList: ClassData[] = [
  {
    classID: 101,
    className: "Algebra 101",
    total_students: 25,
    present_students: 25,
    absent_students: 0,
    attendance_rate: 100.0,
    emotion_distribution: { happy: 500, neutral: 1200, confused: 150 },
    students_list: [
      {
        studentID: "S001",
        studentName: "Alex Johnson",
        status: "Engaged",
        emotion_summary: { happy: 30, neutral: 60 },
        frames_attended: 90,
      },
      {
        studentID: "S002",
        studentName: "Maria Garcia",
        status: "Neutral",
        emotion_summary: { neutral: 85 },
        frames_attended: 85,
      },
    ],
  },
  {
    classID: 102,
    className: "History 202",
    total_students: 30,
    present_students: 27,
    absent_students: 3,
    attendance_rate: 90.0,
    emotion_distribution: { happy: 800, neutral: 1000, confused: 50 },
    students_list: [
      {
        studentID: "S003",
        studentName: "Chen Wei",
        status: "Distracted",
        emotion_summary: { confused: 40, neutral: 20 },
        frames_attended: 60,
      },
      {
        studentID: "S004",
        studentName: "Emily Carter",
        status: "Engaged",
        emotion_summary: { happy: 70, neutral: 30 },
        frames_attended: 100,
      },
    ],
  },
];

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

const EngagementStatusChip = ({
  status,
}: {
  status: ClassStudentDetail["status"];
}) => {
  const color = {
    Engaged: "success",
    Passive: "warning",
    Distracted: "error",
    Neutral: "default",
  }[status] as "success" | "warning" | "error" | "default";
  return (
    <Chip
      label={status}
      color={color}
      size="small"
    />
  );
};

// --- MAIN CLASSES PAGE COMPONENT ---
export const ClassesPage: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(
    classesList[0]
  );

  const filteredClasses = useMemo(() => {
    return classesList.filter((c) =>
      c.className.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const emotionChartData = useMemo(() => {
    if (!selectedClass) return [];
    return Object.entries(selectedClass.emotion_distribution).map(
      ([name, value]) => ({ name, value })
    );
  }, [selectedClass]);

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
        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          {filteredClasses.map((c) => (
            <ListItem
              key={c.classID}
              disablePadding
            >
              <ListItemButton
                selected={selectedClass?.classID === c.classID}
                onClick={() => setSelectedClass(c)}
              >
                <ListItemText
                  primary={c.className}
                  secondary={`ID: ${c.classID}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
        {!selectedClass ? (
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
                {selectedClass.className}
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
                  value={`${selectedClass.attendance_rate}%`}
                />
                <StatCard
                  title="Present Students"
                  value={`${selectedClass.present_students} / ${selectedClass.total_students}`}
                />
              </Stack>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Emotion Distribution
              </Typography>
              <Box sx={{ height: 200 }}>
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
                      <TableCell>Student</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Emotions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedClass.students_list.map((student) => (
                      <TableRow key={student.studentID}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ mr: 1.5, width: 32, height: 32 }}>
                              {student.studentName.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body1">
                                {student.studentName}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {student.studentID}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <EngagementStatusChip status={student.status} />
                        </TableCell>
                        <TableCell>
                          {Object.entries(student.emotion_summary)
                            .map(([key, val]) => `${key}: ${val}`)
                            .join(", ")}
                        </TableCell>
                      </TableRow>
                    ))}
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
