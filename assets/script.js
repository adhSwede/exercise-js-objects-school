// ===========================================================
//        exercise-js-objects-school
// ===========================================================

// ----- 1 -----
// Define the school with basic details, plus empty lists for students and teachers.
const bullerbyskolan = {
  name: "Bullerbyskolan",
  address: "gatan 1",
  zipcode: 11111,
  city: "Bullerbyn",
  students: [], // Empty array to store students later
  teachers: [], // Empty array to store teachers later
};

// ----- 2 -----
// Set up subjects with empty student and teacher arrays.
let matematik = { name: "Matematik", students: [], teacher: {} }; // Matematik subject with empty student and teacher links
let gymnastik = { name: "Gymnastik", students: [], teacher: {} }; // Gymnastik subject
let naturkunskap = { name: "Naturkunskap", students: [], teacher: {} }; // Naturkunskap subject

const subjects = [matematik, gymnastik, naturkunskap]; //! Organize all subjects here for easy access

// ----- 3 -----
// Add students with their details; each has an empty subjects list to start.
let lasse = { name: "Lasse", age: 7, gender: "M", subjects: [] }; // Lasse with no subjects initially
let bosse = { name: "Bosse", age: 7, gender: "M", subjects: [] }; // Bosse with no subjects
let olle = { name: "Olle", age: 9, gender: "M", subjects: [] }; // Olle with no subjects
let anna = { name: "Anna", age: 9, gender: "F", subjects: [] }; // Anna with no subjects
let lisa = { name: "Lisa", age: 6, gender: "F", subjects: [] }; // Lisa with no subjects

const students = [lasse, bosse, olle, anna, lisa]; //! Organize all students here

// ----- 4 -----
// Add teachers, each with an empty subjects list to start.
let lars = { name: "Lars", subjects: [] }; // Lars teacher with no subjects initially
let mats = { name: "Mats", subjects: [] }; // Mats teacher with no subjects initially

const teachers = [lars, mats]; //! Organize all teachers here

// ----- 5 -----
// Link a subject to a teacher (only from teacher side, one-way link).
lars.subjects.push(matematik); // Lars is now teaching Matematik

// ----- 6 -----
// Link a student to a subject (only from subject side, one-way link).
matematik.students.push(lasse); // Lasse is enrolled in Matematik

// ----- 7 -----
// Create helper function to add subjects to a teacher’s list and vice-versa.
// The function could be used to link a teacher to a subject, but is not used in this code block.

// ----- 8 -----
// Attach an addSubject method to each teacher to add subjects they teach.
teachers.forEach((teacher) => {
  teacher.addSubject = function (subject) {
    if (!this.subjects.includes(subject)) {
      subject.teacher = this; // Link the teacher to the subject
      this.subjects.push(subject); // Add the subject to the teacher's list
    } else {
      console.log(`${this.name} already teaches ${subject.name}.`); // Prevent assigning a subject twice
    }
    console.log(this); // Log the teacher object
  };
});

// ----- 9 -----
// Attach an addTeacher method to each subject to set its teacher.
subjects.forEach((subject) => {
  subject.addTeacher = function (teacher) {
    if (this.teacher === teacher) {
      console.log(`${teacher.name} is already teaching ${this.name}.`); // Prevent assigning the same teacher again
      return;
    }
    this.teacher = teacher; // Link the teacher to the subject
    if (!teacher.subjects.includes(this)) {
      teacher.subjects.push(this); // Ensure mutual linking
    }
    console.log(this); // Log the subject object
  };
});

// Attach an enlistToSubject method to each student to enroll in subjects.
students.forEach((student) => {
  student.enlistToSubject = function (subject) {
    if (!this.subjects.includes(subject)) {
      this.subjects.push(subject); // Enroll the student in the subject
      subject.students.push(this); // Link the student to the subject
    } else {
      console.log(`${this.name} is already enrolled in ${subject.name}.`); // Prevent duplicate enrollment
    }
    console.log(this); // Log the student object
  };
});

// Attach an addStudent method to each subject to enroll students.
subjects.forEach((subject) => {
  subject.addStudent = function (student) {
    if (!this.students.includes(student)) {
      this.students.push(student); // Enroll the student in the subject
      student.subjects.push(this); // Link the subject to the student
    } else {
      console.log(`${student.name} is already enrolled in ${this.name}.`); // Prevent duplicate enrollment
    }
    console.log(this); // Log the subject object
  };
});

// ----- 10 -----
// Notice how similar this system is to an admin database; mutual references keep things in sync.
// Right now, we have to prevent duplicates manually, for example, a teacher assigned to a subject twice.

// ----- 11 -----
// quitSubject method for students to remove themselves from a subject.
students.forEach((student) => {
  student.quitSubject = function (subject) {
    const subjectIndex = this.subjects.findIndex((s) => s === subject);
    const studentIndex = subject.students.findIndex((st) => st === student);

    if (subjectIndex !== -1 && studentIndex !== -1) {
      this.subjects.splice(subjectIndex, 1); // Remove the subject from the student
      subject.students.splice(studentIndex, 1); // Remove the student from the subject
      console.log(`${student.name} has quit ${subject.name}.`); // Log the removal
    } else {
      console.log(`${student.name} doesn't attend ${subject.name}.`); // Log if the student is not enrolled
    }
  };
});

// removeTeacher method to detach a teacher from a subject.
subjects.forEach((subject) => {
  subject.removeTeacher = function () {
    if (Object.keys(this.teacher).length === 0) {
      console.log(`There is no teacher for ${this.name}`); // Check if there’s no teacher
    } else {
      this.teacher = {}; // Remove the teacher from the subject
      console.log(subject); // Log the subject object
    }
  };
});

// relegateStudent function removes a student from school and subjects.
const relegateStudent = (student) => {
  subjects.forEach((subject) => {
    const studentIndex = subject.students.findIndex((s) => s === student);
    if (studentIndex !== -1) {
      subject.students.splice(studentIndex, 1); // Remove the student from all subjects
      console.log(`Removed ${student.name} from ${subject.name}`);
    }
  });
  const indexInStudentsArray = students.findIndex((s) => s === student);
  if (indexInStudentsArray !== -1) {
    students.splice(indexInStudentsArray, 1); // Remove the student from the students list
    console.log(`${student.name} has been fully removed from the system.`);
  }
};

// fireTeacher function removes a teacher from school and subjects.
const fireTeacher = (teacher) => {
  subjects.forEach((subject) => {
    if (subject.teacher === teacher) {
      subject.teacher = {}; // Remove the teacher from the subject
      console.log(`Fired teacher from ${subject.name}`); // Log teacher removal
    }
  });
  const teacherIndex = teachers.findIndex((t) => t === teacher);
  if (teacherIndex !== -1) {
    teachers.splice(teacherIndex, 1); // Remove the teacher from the teachers list
    console.log(`${teacher.name} has been fired from the system.`); // Log teacher removal
  }
};

// enrollStudent function to add a new student to the school.
const enrollStudent = (name, age, gender) => {
  const newStudent = { name, age, gender, subjects: [] }; // Create a new student object
  students.push(newStudent); // Add the new student to the students array
  console.log(`${name} has been enrolled!`); // Log the enrollment
};

// hireTeacher function to add a new teacher to the school.
const hireTeacher = (name, subjects) => {
  const newTeacher = { name, subjects }; // Create a new teacher object
  teachers.push(newTeacher); // Add the new teacher to the teachers array
};

// ----- 12 -----
// System seems ready for basic operations. Everything is set up, and the functions are working.

// ----- 13 -----
// Initialize school with students, enrollments, and teachers.
const initializeSchool = () => {
  bullerbyskolan.students.push(...students); // Add all students to the school
  console.log("Students have been added to the school.");

  // Enroll students in subjects
  lasse.enlistToSubject(matematik);
  bosse.enlistToSubject(gymnastik);
  olle.enlistToSubject(naturkunskap);
  anna.enlistToSubject(matematik);
  lisa.enlistToSubject(gymnastik);

  // Assign teachers to subjects
  matematik.addTeacher(lars); // Assign Lars to teach Matematik
  gymnastik.addTeacher(mats); // Assign Mats to teach Gymnastik
  naturkunskap.addTeacher(lars); // Assign Lars to teach Naturkunskap

  // Initialize the grades property for each student
  students.forEach((student) => {
    student.grades = {}; // Initialize grades as an empty object
  });

  console.log("Students and teachers have been assigned.");
};
initializeSchool();

// ----- 14 -----
// Display student details including enrolled subjects.
const displayAllStudents = () => {
  for (const student of bullerbyskolan.students) {
    console.log(
      `Student: ${student.name}, Age: ${student.age}, Gender: ${student.gender}`
    );
    if (student.subjects.length > 0) {
      console.log(
        `Enrolled subjects: ${student.subjects
          .map((subject) => subject.name)
          .join(", ")}`
      );
    } else {
      console.log(`${student.name} is not enrolled in any subjects.`); // Log if student has no subjects
    }
    console.log("---");
  }
};

// ----- 15 -----
// displayAllSubjectsOfStudent displays subjects of a single student.
const displayAllSubjectsOfStudent = (student) => {
  if (student.subjects.length > 0) {
    console.log(
      `Subjects: ${student.subjects.map((subject) => subject.name).join(", ")}`
    );
  } else {
    console.log(`${student.name} is not enrolled in any subjects.`); // Log if student has no subjects
  }
  console.log("---");
};

// displayAllStudentsEnlistedToSubject displays students for a single subject.
const displayAllStudentsEnlistedToSubject = (subject) => {
  if (subject.students.length > 0) {
    console.log(
      `Students: ${subject.students.map((student) => student.name).join(", ")}`
    );
  } else {
    console.log(`There are currently no students taking this class.`); // Log if no students in subject
  }
  console.log("---");
};

// displayAllTeachers shows all teachers.
const displayAllTeachers = () => {
  if (teachers.length > 0) {
    console.log(
      `Teachers: ${teachers.map((teacher) => teacher.name).join(", ")}`
    ); // Log all teachers
  } else {
    console.log("No teachers available.");
  }
};

// ----- 16 -----
// students.forEach((student) => {
// For each student in `students`
//   student.grades = {}; // Adding the grades{} object. //! Moved this logic up to initializeSchool make sure all students have a grades object from the get go.
// });

const setGrade = (student, subject, grade) => {
  if (student.subjects.includes(subject)) {
    student.grades[subject.name] = grade; // Use subject name as key
    console.log(
      `${student.name} received a grade of ${grade} in ${subject.name}.`
    );
  } else {
    console.log(
      `${student.name} is not enrolled in ${subject.name}. Grade not set.`
    );
  }
};
