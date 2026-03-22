import { PrismaClient, Role, Department, EmpStatus, CourseStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordAdmin = await bcrypt.hash('password123', 10)
  const passwordHR = await bcrypt.hash('password123', 10)
  const defaultPassword = await bcrypt.hash('password123', 10)

  // Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@yugamcloud.ai' },
    update: {},
    create: {
      name: 'Arjun Admin',
      email: 'admin@yugamcloud.ai',
      role: Role.ADMIN,
      password: passwordAdmin,
    },
  })

  const hr = await prisma.user.upsert({
    where: { email: 'hr@yugamcloud.ai' },
    update: {},
    create: {
      name: 'Sneha Sharma',
      email: 'hr@yugamcloud.ai',
      role: Role.HR,
      password: passwordHR,
    },
  })

  // Employees data
  const employeesData = [
    { name: 'Priya Sharma', email: 'priya@yugamcloud.ai', empId: 'YAI-001', dept: Department.ENGINEERING, desig: 'Sr. Next.js Dev', status: EmpStatus.ACTIVE, salary: 55000, joined: new Date('2024-01-01') },
    { name: 'Rohit Kumar', email: 'rohit@yugamcloud.ai', empId: 'YAI-002', dept: Department.TRAINING, desig: 'Snowflake Trainer', status: EmpStatus.ACTIVE, salary: 48000, joined: new Date('2024-03-01') },
    { name: 'Meena Rao', email: 'meena@yugamcloud.ai', empId: 'YAI-003', dept: Department.HR, desig: 'HR Executive', status: EmpStatus.ACTIVE, salary: 35000, joined: new Date('2024-02-01') },
    { name: 'Arjun Mehta', email: 'arjun@yugamcloud.ai', empId: 'YAI-004', dept: Department.ENGINEERING, desig: 'Express.js Dev', status: EmpStatus.PROBATION, salary: 45000, joined: new Date('2026-04-01') },
    { name: 'Divya Tiwari', email: 'divya@yugamcloud.ai', empId: 'YAI-005', dept: Department.PLACEMENT, desig: 'Placement Officer', status: EmpStatus.ACTIVE, salary: 38000, joined: new Date('2024-06-01') },
    { name: 'Kiran Patel', email: 'kiran@yugamcloud.ai', empId: 'YAI-006', dept: Department.DATA_ENGINEERING, desig: 'Snowflake DBA', status: EmpStatus.ACTIVE, salary: 72000, joined: new Date('2024-08-01') },
    { name: 'Ravi Shankar', email: 'ravi@yugamcloud.ai', empId: 'YAI-007', dept: Department.DEVOPS, desig: 'Cloud Architect', status: EmpStatus.ACTIVE, salary: 85000, joined: new Date('2023-01-01') },
    { name: 'Nandini Verma', email: 'nandini@yugamcloud.ai', empId: 'YAI-008', dept: Department.ENGINEERING, desig: 'React Native Dev', status: EmpStatus.NOTICE_PERIOD, salary: 42000, joined: new Date('2023-05-01') },
  ]

  for (const emp of employeesData) {
    const user = await prisma.user.upsert({
      where: { email: emp.email },
      update: {},
      create: {
        name: emp.name,
        email: emp.email,
        password: defaultPassword,
        role: Role.EMPLOYEE,
      }
    })

    await prisma.employee.upsert({
      where: { empId: emp.empId },
      update: {},
      create: {
        empId: emp.empId,
        userId: user.id,
        department: emp.dept,
        designation: emp.desig,
        status: emp.status,
        salary: emp.salary,
        joinedAt: emp.joined,
      }
    })
  }

  // Courses
  const coursesData = [
    { name: 'Snowflake Data Engineering', duration: '3 months', techStack: ['Snowflake', 'SQL', 'dbt', 'Airflow'], isFeatured: true, batchCode: 'B-SF-12', status: CourseStatus.ACTIVE },
    { name: 'Next.js 14 Full Stack', duration: '3 months', techStack: ['Next.js', 'React', 'TypeScript', 'Prisma'], isFeatured: false, batchCode: 'B-NX-7', status: CourseStatus.ACTIVE },
    { name: 'Express.js & Node.js Backend', duration: '2 months', techStack: ['Node.js', 'Express.js', 'MongoDB', 'Redis'], isFeatured: false, batchCode: 'B-EX-9', status: CourseStatus.ACTIVE },
    { name: 'DevOps & Kubernetes', duration: '2 months', techStack: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'], isFeatured: false, batchCode: 'B-DO-5', status: CourseStatus.ACTIVE },
    { name: 'Python & Machine Learning', duration: '3 months', techStack: ['Python', 'TensorFlow', 'Pandas', 'scikit-learn'], isFeatured: false, batchCode: 'B-PY-3', status: CourseStatus.UPCOMING },
    { name: 'AWS Solutions Architect', duration: '6 weeks', techStack: ['AWS', 'EC2', 'S3', 'Lambda', 'CloudFormation'], isFeatured: false, batchCode: 'B-AW-6', status: CourseStatus.ACTIVE },
    { name: 'React Native Mobile', duration: '2 months', techStack: ['React Native', 'Expo', 'Firebase'], isFeatured: false, batchCode: 'B-RN-4', status: CourseStatus.ACTIVE },
    { name: 'UI/UX with Figma', duration: '6 weeks', techStack: ['Figma', 'Design Systems', 'Accessibility'], isFeatured: false, batchCode: 'B-UX-2', status: CourseStatus.ACTIVE },
  ]

  for (const c of coursesData) {
    await prisma.course.upsert({
      where: { batchCode: c.batchCode },
      update: {},
      create: c,
    })
  }

  console.log('Seed executed correctly')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
