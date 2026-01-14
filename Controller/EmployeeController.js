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
    const record = await EmployeeService.selectEmployeeProfile(req);
    res.status(200).json({ success: true, record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
module.exports = { createEmployeeRecord, selectEmployeeRecord };
