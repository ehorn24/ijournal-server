CREATE TABLE entries (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  owner INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  journal INTEGER REFERENCES journals(id) ON DELETE CASCADE NOT NULL,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE,
  entry_title TEXT NOT NULL,
  tags TEXT[],
  entry_text TEXT NOT NULL
);