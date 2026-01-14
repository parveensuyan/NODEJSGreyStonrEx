const pool = require("../dbMysql");

async function createEmployeeProfile(data) {
  const insertRecord = await pool.query(
    "INSERT INTO employee_table (name, email) VALUES (?,?)",
    [data.name, data.email]
  );
  return insertRecord;
}
async function selectEmployeeProfile(orderBy = "asc") {
  const result = await pool.query("select * from employee_table order by name asc");
  return result;
}
// async function deleteEmployeeProfile(employeeId) {
//   const insertRecord = await pool.query(
//     "delete from employee_table"
//   );
//   return insertRecord;
// }
module.exports = { createEmployeeProfile, selectEmployeeProfile };
