# ERP-app-ts
## Установка
1. Заходишь в папку `src/db`. Набираешь команду ```docker-compose up -d```
2. Из корневой директории, набираешь:
   - `npm install`
   - `npm install -g typescript`
   - `npm install -g nodemon`
3. Для запуска приложения набираешь `npm start` из корневой директории.
4. Скачиваешь [Postman](https://www.getpostman.com/)
## Использование
По умолчанию, в MongoDB создаеться база `posts`. В будут храниться две коллекции: `Users` и `Posts`. 
### API БД
#### Просмотр
Для просмотра всех пользователей в БД:
  - Метод GET: [localhost:3000/api/v1/users/](http://localhost:3000/api/v1/users/)
   
Для просмотра всех постов в БД
  - Метод GET: [localhost:3000/api/v1/posts/](http://localhost:3000/api/v1/posts/)
#### Создание
Для создания пользователя в БД:
  - Метод POST: [localhost:3000/api/v1/users/](http://localhost:3000/api/v1/users/). В качестве параметров передаеться JSON объект:
```javascript
{
"firstName":"Ilya",
"lastName":"Ivantsov",
"username":"iivantsov",
"email":"iwww@gmail.com",
"password":"admin"
}
```
Поле `username` - уникальное для пользователей. По нему производится поиск одного пользователя.

Для создания поста в БД:
  - Метод POST: [localhost:3000/api/v1/posts/](http://localhost:3000/api/v1/posts/). В качестве параметров передаеться JSON объект:
```javascript
{
"title": "Cool",
"slug": "tag-one",
"content": "It's so cool,bro. What do you think?"
}
```
Поле `slug` - уникальное для постов. По нему производится поиск одного поста.
#### Просмотр одного
Для просмотра одного пользователя в БД:
  - Метод GET: [localhost:3000/api/v1/users/iivantsov](http://localhost:3000/api/v1/users/iivantsov)
   
Для просмотра одного поста в БД
  - Метод GET: [localhost:3000/api/v1/posts/tag-one](http://localhost:3000/api/v1/posts/tag-one)
 #### Удаление
Для удаления одного пользователя из БД:
  - Метод DELETE: [localhost:3000/api/v1/users/iivantsov](http://localhost:3000/api/v1/users/iivantsov)
   
Для удаления одного поста из БД
  - Метод DELETE: [localhost:3000/api/v1/posts/tag-one](http://localhost:3000/api/v1/posts/tag-one)
#### Обновление
Для обновления данных пользователя в БД:
  - Метод PUT: [localhost:3000/api/v1/users/iivantsov](http://localhost:3000/api/v1/users/iivantsov)

В качестве параметров передаеться JSON объект как в пунтке `Добавление`.

Для обновления данных поста в БД
  - Метод PUT: [localhost:3000/api/v1/posts/tag-one](http://localhost:3000/api/v1/posts/tag-one)

В качестве параметров передаеться JSON объект как в пунтке `Добавление`.
   
