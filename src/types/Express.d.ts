declare namespace Express {
  interface Request {
    userId?: number;

    permissions?: { roleId: number; permissionId: number; action: number }[];

    status?: number;

    companyId?: number;

    issSuperAdmin?: boolean;
  }
}
