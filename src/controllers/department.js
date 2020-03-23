import DepartmentService from '../database/services/department';
import out from '../helpers/response';

class DepartmentController {
  static async addDepartment(req, res) {
    try {
      const { name } = req.body;
      const duplicate = await DepartmentService.findDepartment({ name });
      if (duplicate) return out(res, 409, 'Department already registered', null, 'CONFLICT_ERROR');
      const createdDepartment = await DepartmentService.addDepartment(req.body);
      createdDepartment.__v = undefined;
      return out(res, 201, 'Registered Successfully', createdDepartment);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async getAllDepartments(req, res) {
    try {
      const departments = await DepartmentService.getAllDepartments();
      if (departments.length === 0) return out(res, 404, 'Departments not found', null, 'NOT_FOUND');
      return out(res, 200, 'Departments retrieved', departments);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async updateDepartment(req, res) {
    try {
      const { department: departmentId } = req.body;
      const department = await DepartmentService.findDepartment({ _id: departmentId });
      if (department.length === 0) return out(res, 404, 'Department not found', null, 'NOT_FOUND');
      const updateDepartment = await DepartmentService.updateDepartment(departmentId, req.body);
      if (!updateDepartment) return out(res, 500, 'Can not update Department', null, 'NOT_FOUND');
      updateDepartment.__v = undefined;
      return out(res, 200, 'Department Updated', updateDepartment);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async deactivateDepartment(req, res) {
    try {
      const { department: departmentId } = req.body;
      req.body.status = 'OFF';
      const department = await DepartmentService.findDepartment({ _id: departmentId });
      if (department.length === 0 || department.status === 'OFF') return out(res, 404, 'Department not found', null, 'NOT_FOUND');
      // eslint-disable-next-line max-len
      const updateDepartment = await DepartmentService.updateDepartment(departmentId, { status: req.body.status });
      if (!updateDepartment) return out(res, 500, 'Can not deactivate Department', null, 'NOT_FOUND');
      updateDepartment.__v = undefined;
      return out(res, 200, 'Department Deactivated', updateDepartment);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }

  static async activateDepartment(req, res) {
    try {
      const { department: departmentId } = req.body;
      req.body.status = 'ON';
      const department = await DepartmentService.findDepartment({ _id: departmentId });
      if (department.length === 0 || department.status === 'ON') return out(res, 404, 'Department not found', null, 'NOT_FOUND');
      // eslint-disable-next-line max-len
      const updateDepartment = await DepartmentService.updateDepartment(departmentId, { status: req.body.status });
      if (!updateDepartment) return out(res, 500, 'Can not Activate Department', null, 'NOT_FOUND');
      updateDepartment.__v = undefined;
      return out(res, 200, 'Department Activated', updateDepartment);
    } catch (error) {
      return out(res, 500, error.message || error, null, 'SERVER_ERROR');
    }
  }
}

export default DepartmentController;
