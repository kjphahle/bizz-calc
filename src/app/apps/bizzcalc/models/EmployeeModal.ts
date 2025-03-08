export interface EmployeeModel {
    EmploymentMonth: string;
    NumbeOfEmployees: number,
    EmployeeSalary: number;
    ReviewMonth: string;
    ReviewPercentage: number;
    PageNumber: number;
  }
  
  export interface IEmployeeModal {
    UserId: number;
    Employees: EmployeeModel[];
  }
  