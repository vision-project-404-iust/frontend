// src/pages/StudentsPage.tsx

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
  ListItemAvatar,
  Avatar,
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
  LinearProgress,
  Stack,
  Collapse,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// Import more specific icons for emotions
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CelebrationIcon from "@mui/icons-material/Celebration";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SickIcon from "@mui/icons-material/Sick";

// --- TYPE DEFINITIONS ---
interface Student {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface StudentClassDetail {
  classId: string;
  className: string;
  status: "Engaged" | "Passive" | "Distracted";
  emotion_summary: {
    [key: string]: number; // Allow any emotion string
  };
  frames_attended: number;
  total_frames: number;
}

// --- MOCK DATA ---
const studentsList: Student[] = [
  { id: "S001", name: "Alex Johnson" },
  { id: "S002", name: "Maria Garcia" },
  { id: "S003", name: "Chen Wei" },
  { id: "S004", name: "Emily Carter" },
  { id: "S005", name: "David Lee" },
  { id: "S006", name: "Fatima Al-Sayed" },
  { id: "S001", name: "Alex Johnson" },
  { id: "S002", name: "Maria Garcia" },
  { id: "S003", name: "Chen Wei" },
  { id: "S004", name: "Emily Carter" },
  { id: "S005", name: "David Lee" },
  { id: "S006", name: "Fatima Al-Sayed" },
  { id: "S001", name: "Alex Johnson" },
  { id: "S002", name: "Maria Garcia" },
  { id: "S003", name: "Chen Wei" },
  { id: "S004", name: "Emily Carter" },
  { id: "S005", name: "David Lee" },
  { id: "S006", name: "Fatima Al-Sayed" },
];

const studentDetailsData: Record<string, StudentClassDetail[]> = {
  S001: [
    {
      classId: "C101",
      className: "Algebra 101",
      status: "Engaged",
      emotion_summary: { happy: 30, neutral: 60, joy: 5 },
      frames_attended: 90,
      total_frames: 100,
    },
    {
      classId: "C102",
      className: "History 202",
      status: "Engaged",
      emotion_summary: { happy: 45, neutral: 55, content: 10 },
      frames_attended: 98,
      total_frames: 100,
    },
  ],
  S002: [
    {
      classId: "C101",
      className: "Algebra 101",
      status: "Engaged",
      emotion_summary: { happy: 50, neutral: 50, excited: 15 },
      frames_attended: 100,
      total_frames: 100,
    },
    {
      classId: "C103",
      className: "Physics 301",
      status: "Passive",
      emotion_summary: { sad: 10, neutral: 80, confused: 10 },
      frames_attended: 85,
      total_frames: 100,
    },
  ],
  S003: [
    {
      classId: "C103",
      className: "Physics 301",
      status: "Distracted",
      emotion_summary: { angry: 5, neutral: 45, confused: 50 },
      frames_attended: 60,
      total_frames: 100,
    },
    {
      classId: "C104",
      className: "Literature 404",
      status: "Passive",
      emotion_summary: { sad: 20, neutral: 70, disgust: 3 },
      frames_attended: 75,
      total_frames: 100,
    },
  ],
};

// --- HELPER COMPONENTS ---
const EngagementStatusChip = ({
  status,
}: {
  status: StudentClassDetail["status"];
}) => {
  const color = {
    Engaged: "success",
    Passive: "warning",
    Distracted: "error",
  }[status] as "success" | "warning" | "error";
  return (
    <Chip
      label={status}
      color={color}
      size="small"
    />
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
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

// New Collapsible Row Component with improved emotion display
const ClassDetailRow = ({ detail }: { detail: StudentClassDetail }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const attendancePercentage =
    (detail.frames_attended / detail.total_frames) * 100;

  const getEmotionIcon = (emotion: string) => {
    const emotionMap: {
      [key: string]: { icon: React.ReactNode; color: string };
    } = {
      // Positive
      happy: {
        icon: <SentimentVerySatisfiedIcon />,
        color: theme.palette.success.main,
      },
      joy: {
        icon: <SentimentVerySatisfiedIcon />,
        color: theme.palette.success.main,
      },
      excited: { icon: <CelebrationIcon />, color: theme.palette.success.main },
      content: {
        icon: <SentimentVerySatisfiedIcon />,
        color: theme.palette.success.main,
      },
      positive: {
        icon: <SentimentVerySatisfiedIcon />,
        color: theme.palette.success.main,
      },
      // Negative
      sad: {
        icon: <SentimentVeryDissatisfiedIcon />,
        color: theme.palette.error.main,
      },
      angry: { icon: <MoodBadIcon />, color: theme.palette.error.main },
      fear: { icon: <MoodBadIcon />, color: theme.palette.error.main },
      disgust: { icon: <SickIcon />, color: theme.palette.error.main },
      negative: {
        icon: <SentimentVeryDissatisfiedIcon />,
        color: theme.palette.error.main,
      },
      // Neutral / Other
      neutral: {
        icon: <SentimentNeutralIcon />,
        color: theme.palette.text.secondary,
      },
      confused: {
        icon: <HelpOutlineIcon />,
        color: theme.palette.warning.main,
      },
    };

    const { icon, color } = emotionMap[emotion.toLowerCase()] || {
      icon: <SentimentNeutralIcon />,
      color: theme.palette.text.secondary,
    };

    return React.cloneElement(icon as React.ReactElement, {
      sx: { color, mr: 1.5 },
    });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
        >
          {detail.className}
        </TableCell>
        <TableCell>
          <EngagementStatusChip status={detail.status} />
        </TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={attendancePercentage}
              />
            </Box>
            <Box sx={{ minWidth: 40 }}>
              <Typography
                variant="body2"
                color="text.secondary"
              >{`${Math.round(attendancePercentage)}%`}</Typography>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <Box
              sx={{ margin: 2, p: 2, bgcolor: "action.hover", borderRadius: 1 }}
            >
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              >
                Emotion Details
              </Typography>
              <Stack spacing={1.5}>
                {Object.entries(detail.emotion_summary).map(([key, value]) => (
                  <Box
                    key={key}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {getEmotionIcon(key)}
                    <Typography
                      variant="body1"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {key}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                    >
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

// --- MAIN STUDENTS PAGE COMPONENT ---
export const StudentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(
    studentsList[0]
  );

  const filteredStudents = useMemo(() => {
    return studentsList.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const studentDetails = selectedStudent
    ? studentDetailsData[selectedStudent.id]
    : [];

  const overallAttendance = useMemo(() => {
    if (!studentDetails || studentDetails.length === 0) return "0%";
    const totalAttended = studentDetails.reduce(
      (sum, d) => sum + d.frames_attended,
      0
    );
    const totalFrames = studentDetails.reduce(
      (sum, d) => sum + d.total_frames,
      0
    );
    return `${Math.round((totalAttended / totalFrames) * 100)}%`;
  }, [studentDetails]);

  return (
    <Paper
      variant="outlined"
      sx={{ display: "flex", height: "100%", borderRadius: 2 }}
    >
      {/* LEFT PANE: Student List */}
      <Box
        sx={{
          width: 280,
          borderRight: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search students..."
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
          {filteredStudents.map((student) => (
            <ListItem
              key={student.id}
              disablePadding
            >
              <ListItemButton
                selected={selectedStudent?.id === student.id}
                onClick={() => setSelectedStudent(student)}
              >
                <ListItemAvatar>
                  <Avatar>{student.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={student.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* RIGHT PANE: Student Details */}
      <Box sx={{ flexGrow: 1, p: 3, overflowX: "hidden", overflowY: "auto" }}>
        {!selectedStudent ? (
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
              Select a student to view details
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {selectedStudent.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Overall Performance Summary
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              sx={{ mb: 4 }}
            >
              <StatCard
                title="Overall Attendance"
                value={overallAttendance}
              />
              <StatCard
                title="Classes Monitored"
                value={studentDetails?.length.toString() || "0"}
              />
            </Stack>

            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              Class Breakdown
            </Typography>
            <TableContainer
              component={Paper}
              variant="outlined"
            >
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Class</TableCell>
                    <TableCell>Engagement Status</TableCell>
                    <TableCell>Attendance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentDetails?.map((detail) => (
                    <ClassDetailRow
                      key={detail.classId}
                      detail={detail}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
