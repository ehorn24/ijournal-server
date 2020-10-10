# Welcome to iJournal!

iJournal is an online journaling app. In their unique account, users can create journals with custom titles and covers, as well as entries to go in them. Each entry has a custom title and the option to add tags about the entry's subject(s). Users can search for entries by journal, month, year and tags.

### Live app

https://ijournal.vercel.app/

### Technology used

HTML, CSS, React, JavaScript, Node, Express, PostgreSQL

### Screenshots

Landing page
![Landing Page](https://i.imgur.com/DU8om7A.png)

Home page
![Home Page](https://i.imgur.com/VjfyDmO.png)

Display entries in a journal
![Display entries](https://i.imgur.com/Eovi7A3.png)

Filter example: Entries written in 2020
![Filter for Entries](https://i.imgur.com/vQep1iZ.png)

Create a new journal
![Create new journal](https://i.imgur.com/WIXr0Od.png)

Edit an existing journal
![Edit a journal](https://i.imgur.com/YVXrciv.png)

Create a new entry
![Create an entry](https://i.imgur.com/OiV2q3G.png)

### API Documentation

/api

#### API Overview

```
.
├── /users
│   └── GET
│     ├── /
│   └── POST
│     ├── /
│     └── /login
│     └── /username
│   └── DELETE
│     ├── /:user_id
│
├── /journals
│   └── GET
│     ├── /j/:journal_id
│     ├── /u/:user_id
│   └── POST
│     ├── /u/:user_id
│   └── PATCH
│     ├── /j/:journal_id
│   └── DELETE
│     ├── /j/:journal_id
│
├── /entries
│   └── GET
│     ├── /u/:user_id
│   └── POST
│     ├── /u/:user_id
│   └── DELETE
│     ├── /:entry_id
```

#### User Endpoints - /api/users

##### GET /

Gets all users in the database

```
//res.body
  [
    {
      username: String,
      id: Number
    }
  ]
```

##### POST /

Creates a new user

```
//req.body
  {
    username: String,
    password: String,
    firstname: String,
    lastname: String
  }
//res.body
  {
    id: Number,
    username: String,
    firstname: String,
    lastname: String
  }
```

##### POST /login

Authenticates existing user

```
//req.body
  {
    username: String,
    password: String
  }
//res.body
  {
    username: String
  }
```

##### POST /username

Gets info for a specific user

```
//req.body
  {
    username: String
  }
//res.body
  {
    id: Number,
    username: String,
    firstname: String,
    lastname: String
  }
```

#### Journal Endpoints - /api/journals

##### GET /j/:journal_id

Get info for a specific journal

```
//req.params
  {
    journal_id: journal_id
  }
//res.body
  {
    id: Number,
    owner: Number,
    journal_name: String,
    date_created: String,
    journal_cover: String
  }
```

##### PATCH /j/:journal_id

Edits a journal's name or cover image

```
//req.params
  {
    journal_id: journal_id
  }
//req.body
  {
    journal_name: String,
    journal_cover: String
  }
//res.body - none
```

##### DELETE /j/:journal_id

Deletes a journal

```
//req.params
  {
    journal_id: journal_id
  }
//req.body - none
//res.body - none
```

##### GET /u/:user_id

Gets all journals for a specific user

```
//req.params
  {
    user_id: user_id
  }
//req.body - none
//res.body
  [
    {
      id: Number,
      owner: Number,
      journal_name: String,
      date_created: String,
      journal_cover: String
    }
  ]
```

##### POST /u/:user_id

Create a new journal

```
//req.params
  {
    owner: user_id
  }
//req.body
  {
    journal_name: String,
    journal_cover: String
  }
//res.body
  {
    id: Number,
    owner: Number,
    journal_name: String,
    date_created: String,
    journal_cover: String
  }
```

#### Entry Endpoints - /api/entries

##### GET /u/:user_id

Get all entries for a user

```
//req.params
  {
    owner: user_id
  }
//res.body
  [
    {
      id: Number,
      owner: Number,
      journal: Number,
      date_created: String,
      entry_title: String,
      tags: [
        tag,
        tag,
        tag
      ],
      entry_text: String
    }
  ]
```

##### POST /u/:user_id

Create a new entry

```
//req.params
  {
    owner: user_id
  }
//req.body
  {
    journal, entry_title, tags, entry_text
  }
//res.body
  {
    id: Number,
    owner: Number,
    journal: Number,
    date_created: String,
    entry_title: String,
    tags: [
      tag,
      tag,
      tag
    ],
    entry_text: String
  }
```

##### DELETE /:entry_id

Delete an entry

```
//req.params
  {
    entry_id: entry_id
  }
```

```

```
