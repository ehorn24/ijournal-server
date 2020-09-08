const express = require("express");
const EntryService = require("./entry-service");

const entryRouter = express.Router();
const jsonParser = express.json();

entryRouter
  .route("/u/:user_id")
  .get((req, res, next) => {
    const knexInst = req.app.get("db");
    const user_id = req.params.user_id;
    EntryService.getUserEntries(knexInst, user_id).then((entries) => {
      res.status(200).json(entries);
    });
  })
  .post(jsonParser, (req, res, next) => {
    const knexInst = req.app.get("db");
    const user_id = req.params.user_id;
    const newEntry = {
      owner: user_id,
      journal: req.body.journal,
      entry_title: req.body.entry_title,
      tags: req.body.tags,
      entry_text: req.body.entry_text,
    };
    for (const [key, value] of Object.entries(newEntry)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing ${key} from request body` } });
      }
    }
    EntryService.createNewEntry(knexInst, newEntry)
      .then((entry) => {
        res.status(201).json(entry);
      })
      .catch(next);
  });

module.exports = entryRouter;
