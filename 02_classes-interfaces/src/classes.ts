abstract class Department {
  static fiscalYear = 2021;
  //   private readonly id: string;
  //   private name: string;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.id = id;
    // this.name = n;
    // console.log(this.fiscalYear); !!! ERROR !!!
  }

  static createEmployee(name: string) {
    return { name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    //   this.id = 'd2' !!! ERROR !!!
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  //   public admins: string[];
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    // this.admins = admins
  }

  describe() {
    console.log("IT Department - ID: " + this.id);
  }
}

class AcountingDepartment extends Department {
  private lastReport: string;
  private static instance: AcountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) throw new Error("Please pass in a valid value.");
    this.addReport(value);
  }

  private constructor(id: string, public reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AcountingDepartment.instance) {
      return this.instance;
    }

    this.instance = new AcountingDepartment("d2", []);
    return this.instance;
  }

  describe() {
    console.log("Accounting Department - ID: " + this.id);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  getReports() {
    console.log(this.reports);
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }
}

const employee = Department.createEmployee("Max");
console.log(employee, Department.fiscalYear);

const it = new ITDepartment("d1", ["Max"]);
// const accounting = new AcountingDepartment("d2", []);
const accounting = AcountingDepartment.getInstance();

it.addEmployee("Max");
it.addEmployee("Manu");
it.describe();
it.printEmployeeInformation();
// it.employees[2] = "Anna"; !!! ERROR !!!

accounting.addEmployee("Max");
accounting.addEmployee("Manu");
accounting.addReport("Something went wrong");
accounting.mostRecentReport = "New Report";
accounting.describe();
accounting.printEmployeeInformation();
accounting.getReports();
console.log(accounting.mostRecentReport);
