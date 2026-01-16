const pool = require("../dbMysql");

async function createEmployeeProfile(data) {
  const insertRecord = await pool.query(
    "INSERT INTO employee_table (name, email) VALUES (?,?)",
    [data.name, data.email]
  );
  return insertRecord;
}
async function selectEmployeeProfile(data) {
  var param = `%${data}%`;

  const [result] = await pool.query(
    "select * from employee_table  where name LIKE ? ",
    [param]
  );
  return result;
}
async function searchEmployeeProfile(param) {
  var queryParam = [];
  var sql = "select * from employee_table";
  if (param.searchString) {
    sql += " where name LIKE ? OR email  LIKE ?";
    queryParam.push(param.searchString);
    queryParam.push(param.searchString);
  }
  if (param.limit) {
    sql += " limit ?";
    queryParam.push(param.limit);
  }
  if (param.offset) {
    sql += "  offset ?";
    queryParam.push(param.offset);
  }
  const [result] = await pool.query(sql, [queryParam]);
  return result;
}

async function deleteEmployeeProfile(employeeId) {
  const [result] = await pool.query(
    "delete from employee_table WHERE  employee_id = ?",
    [employeeId]
  );
  return result;
}
module.exports = {
  createEmployeeProfile,
  selectEmployeeProfile,
  deleteEmployeeProfile,
  searchEmployeeProfile,
};
