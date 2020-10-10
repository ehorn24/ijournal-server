# Welcome to iJournal!

iJournal is an online journaling app. In their unique account, users can create journals with custom titles and covers, as well as entries to go in them. Each entry has a custom title and the option to add tags about the entry's subject(s). Users can search for entries by journal, month, year and tags.

### Live app

https://ijournal.vercel.app/

### Technology used

HTML, CSS, React, JavaScript, Node, Express, PostgreSQL

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

##### GET **/api/users/**

```
//res.body
{
  username: String,
  id:  Integer
}
```

Screenshots of iJournal:

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
