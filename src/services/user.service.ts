export type User = any;

export class UserRepository {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme'
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess'
        }
    ];

    constructor() {}

    public async findOne(username:string): Promise<User> {
        return this.users.find(user => user.username == username);
    }

}