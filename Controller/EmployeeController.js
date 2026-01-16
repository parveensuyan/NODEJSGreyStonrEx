const EmployeeService = require("../Services/EmployeeService");

async function createEmployeeRecord(req, res) {
  try {
    const record = await EmployeeService.createEmployeeProfile(req.body);
    res.status(201).json({ success: true, record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function selectEmployeeRecord(req, res) {
  try {
    var employeeId = req.params.employeeId;
    const record = await EmployeeService.selectEmployeeProfile(employeeId);
    if (record.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Employee doesn't exist" });
    }
    res.status(200).json({ success: true, record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
async function searchEmployeeRecord(req, res) {
  try {

    const record = await EmployeeService.searchEmployeeProfile({
      searchString: req.query.searchString,
      limit: Number(req.query.limit),
      offset : Number(req.query.offset)
    });
    if (record.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Employee doesn't exist"});
    }
    res.status(200).json({ success: true,totalCount: record.length, record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
async function deleteEmployeeRecord(req, res) {
  try {
    var employeeId = req.params.employeeId;
    const record = await EmployeeService.selectEmployeeProfile(employeeId);
    if (record.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "Employee doesn't exist" });
    }
    const result = await EmployeeService.deleteEmployeeProfile(employeeId);
    res
      .status(200)
      .json({ success: true, result, message: "Delete Successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  createEmployeeRecord,
  selectEmployeeRecord,
  deleteEmployeeRecord,
  searchEmployeeRecord,
};
