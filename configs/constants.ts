export const ROUTES = {
  login: '/web/index.php/auth/login',
  dashboard: /dashboard\/index/,
  adminUsers: '/web/index.php/admin/viewSystemUsers',
  dashboardPage: '/web/index.php/dashboard/index',

} as const;

export const MESSAGES = {
  invalidCredentials: 'Invalid credentials',
  required: 'Required',
} as const;

export const ROLES = {
  admin: 'Admin',
  ess: 'ESS',
} as const;