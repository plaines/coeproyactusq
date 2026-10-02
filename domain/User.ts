export abstract class User {
  // STATIC: pertenece a la CLASE, no a un usuario. Cuenta cuántos usuarios se crearon.
  private static created = 0;
  static get createdCount(): number {
    return User.created;
  }

  // INSTANCIA: cada usuario tiene su propia contraseña
  private _password = '';

  constructor(public readonly username: string, password: string) {
    if (!username.trim()) {
      throw new Error('username is required');        // el constructor garantiza un estado válido
    }
    this.password = password;                          // pasa por la validación del setter
    User.created++;
  }

  get password(): string {
    return this._password;
  }
  set password(value: string) {
    if (value.length < 4) {
      throw new Error('password must have at least 4 characters');
    }
    this._password = value;
  }

  abstract get role(): string;                         // abstracción: cada tipo define su rol

  describe(): string {
    return `${this.username} (${this.role})`;
  }
}