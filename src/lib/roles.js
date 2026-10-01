export const ROLE_HOME = {
  farmer: "/farmer",
  center_staff: "/staff",
  quality_inspector: "/inspector",
  admin: "/admin",
};

export const AREA_ROLES = {
  "/farmer": ["farmer"],
  "/staff": ["center_staff", "admin"],
  "/inspector": ["quality_inspector", "admin"],
  "/admin": ["admin"],
};