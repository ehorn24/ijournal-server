CREATE TABLE journals (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  owner INTEGER NOT NULL,
  journal_name TEXT NOT NULL UNIQUE,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE,
  journal_cover TEXT
);