// src/pages/StudentsPage.tsx

import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
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
  Stack,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// Import the service and types
import { getStudentsDetailStatus } from "../api/services/studentService";
import type { StudentsDetailStatusResponse, StudentDetail } from "../types/api";

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

// --- MAIN STUDENTS PAGE COMPONENT ---
export const StudentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [studentsData, setStudentsData] =
    useState<StudentsDetailStatusResponse>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getStudentsDetailStatus();
        setStudentsData(data);
        // Select the first student by default
        if (Object.keys(data).length > 0) {
          setSelectedStudentId(Object.keys(data)[0]);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch student details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const studentIds = useMemo(() => {
    return Object.keys(studentsData).filter((id) =>
      id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, studentsData]);

  const selectedStudentData: StudentDetail | null = selectedStudentId
    ? studentsData[selectedStudentId]
    : null;

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
        <Box sx={{ p: 2, flexShrink: 0 }}>
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
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ flexGrow: 1, overflowY: "auto" }}>
            {studentIds.map((id) => (
              <ListItem
                key={id}
                disablePadding
              >
                <ListItemButton
                  selected={selectedStudentId === id}
                  onClick={() => setSelectedStudentId(id)}
                >
                  <ListItemAvatar>
                    <Avatar>{id.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={id} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* RIGHT PANE: Student Details */}
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
        ) : !selectedStudentData ? (
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
          <>
            <Box sx={{ p: 3, flexShrink: 0 }}>
              <Typography
                variant="h4"
                fontWeight="bold"
              >
                {selectedStudentId}
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
                  value={`${selectedStudentData.overallAttendance.overallAttendance}%`}
                />
                <StatCard
                  title="Classes Attended"
                  value={selectedStudentData.overallAttendance.classesAttended}
                />
              </Stack>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                Class Breakdown
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: "auto", px: 3, pb: 3 }}>
              <TableContainer
                component={Paper}
                variant="outlined"
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Class ID</TableCell>
                      <TableCell>Frames Attended</TableCell>
                      <TableCell>Emotion Summary</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(selectedStudentData.classBreakdown).map(
                      ([classId, details]) => (
                        <TableRow key={classId}>
                          <TableCell>{classId}</TableCell>
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
