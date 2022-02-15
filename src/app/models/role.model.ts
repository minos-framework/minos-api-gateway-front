export class RoleModel {
  code!: number;
  role_name!: string;
  created_at!: string;
  updated_at!: string;

  setRole(_role: RoleModel) {
    const role = _role as RoleModel;
    this.code = role.code || 0;
    this.role_name = role.role_name || '';
    this.created_at = role.created_at || '';
    this.updated_at = role.updated_at || '';
  }
}
