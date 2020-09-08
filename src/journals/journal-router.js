const express = require("express");
const JournalService = require("./journal-service");

const journalRouter = express.Router();
const jsonParser = express.json();

journalRouter.route("/j/:journal_id").get((req, res, next) => {
  const knexInst = req.app.get("db");
  const journal_id = req.params.journal_id;
  JournalService.getJournalById(knexInst, journal_id)
    .then((journal) => {
      if (!journal) {
        res.status(404).json({
          error: { message: `Journal with ID ${journal_id} does not exist` },
        });
      }
      res.status(200).json(journal);
    })
    .catch(next);
});

journalRouter
  .route("/u/:user_id")
  .get((req, res, next) => {
    const knexInst = req.app.get("db");
    const user_id = req.params.user_id;
    JournalService.getUserJournals(knexInst, user_id)
      .then((journals) => {
        if (journals.length === 0) {
          res.status(404).json({
            error: {
              message: `Either the user with ID ${user_id} does not exist, or they have not created any journals yet`,
            },
          });
        }
        res.status(200).json(journals);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInst = req.app.get("db");
    const user_id = req.params.user_id;
    const newJournal = {
      owner: user_id,
      journal_name: req.body.journal_name,
    };
    for (const [key, value] of Object.entries(newJournal)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing ${key} from request body` } });
      }
    }
    JournalService.createNewJournal(knexInst, newJournal)
      .then((journal) => {
        res.status(201).json(journal);
      })
      .catch(next);
  });

module.exports = journalRouter;
