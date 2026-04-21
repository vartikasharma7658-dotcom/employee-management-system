export const mockEmployees = [
  { id: '1', name: 'Admin User', email: 'admin@company.com', role: 'admin', status: 'Active', department: 'Management' },
  { id: '2', name: 'John Doe', email: 'john@company.com', role: 'employee', status: 'Active', department: 'Engineering' },
  { id: '3', name: 'Jane Smith', email: 'jane@company.com', role: 'employee', status: 'Active', department: 'Design' },
  { id: '4', name: 'Mike Ross', email: 'mike@company.com', role: 'employee', status: 'Inactive', department: 'Marketing' },
];

export const mockTasks = [
  { id: 't1', title: 'Update Landing Page', description: 'Redesign the landing page with Tailwind CSS', assignedTo: '2', status: 'In Progress', priority: 'High', deadline: '2026-05-01' },
  { id: 't2', title: 'Create Logo', description: 'Design a new company logo', assignedTo: '3', status: 'Pending', priority: 'Medium', deadline: '2026-04-25' },
  { id: 't3', title: 'Social Media Campaign', description: 'Plan posts for next month', assignedTo: '4', status: 'Completed', priority: 'Low', deadline: '2026-04-15' },
];
