  const generateStudents = () => {
    const students = [];
    for (let i = 1001; i <= 1990; i++) {
        students.push({
            regnumber: `UG22/SCC/${i}`,
            name: `Student ${i}`,
            department: "Computer Science",
            clearance: {
                library: false,
            bursary: false,
            department: false,
        },
    });
}
    return students;
};
export const students = generateStudents();