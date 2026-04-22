```bash
npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
```
```bash
npx dotenv sequelize db:migrate
```
```bash
npx dotenv sequelize db:migrate:undo
```
```bash
sqlite3 db/dev.db ".schema Users"
```
```bash
npx sequelize seed:generate --name demo-user
```
```bash
npx dotenv sequelize db:seed:all
```
```bash
npx dotenv sequelize db:seed:undo
```
```bash
npx dotenv sequelize db:seed:undo:all
```
```bash
sqlite3 db/dev.db 'SELECT * FROM "Users"'
```