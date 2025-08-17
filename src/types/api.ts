// Type for the attendance status endpoint
export interface ClassAttendanceData {
  classID: number;
  attendanceRate: number;
  totalStudents: number;
  attendedStudents: number;
}

// Type for the emotion status endpoint
export interface ClassEmotionData {
  classID: number;
  emotionDistribution: {
    [key: string]: number; // Allows for various emotions like happy, sad, etc.
  };
}

export interface StudentOverallStatus {
  studentID: string;
  classesAttended: number;
  totalClasses: number;
}

interface OverallAttendance {
  overallAttendance: number;
  classesAttended: number;
}

interface ClassBreakdownDetail {
  framesAttended: number;
  emotionSummary: {
    [key: string]: number;
  };
}

export interface StudentDetail {
  overallAttendance: OverallAttendance;
  classMentioned: number[];
  classBreakdown: {
    [classID: string]: ClassBreakdownDetail;
  };
}

export interface StudentsDetailStatusResponse {
  [studentID: string]: StudentDetail;
}

interface ClassStudentBreakdown {
  framesAttended: number;
  emotionSummary: {
    [key: string]: number;
  };
}

export interface ClassDetail {
  attendanceRate: number;
  presentStudents: number;
  emotionDistribution: {
    [key: string]: number;
  };
  studentBreakdown: {
    [studentID: string]: ClassStudentBreakdown;
  };
}

export interface ClassDetailStatusResponse {
  [classID: string]: ClassDetail;
}
