export abstract class User {
    private static created = 0;
    static get createdCount(): number {
        return User.created;
    }

    
    private _password = '';

    constructor(public readonly username: string, password: string) {
        if (!username.trim()) {
            throw new Error('username is required');        
        }
        this.password = password;                          
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

    abstract get role(): string;

    describe(): string {
        return `${this.username} (${this.role})`;
    }
}