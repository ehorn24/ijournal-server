const express = require("express");
const JournalService = require("./journal-service");

const journalRouter = express.Router();
const jsonParser = express.json();

journalRouter
  .route("/j/:journal_id")
  .get((req, res, next) => {
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
  })
  .patch(jsonParser, (req, res, next) => {
    const knexInst = req.app.get("db");
    const { journal_name, journal_cover } = req.body;
    const itemToUpdate = {
      journal_name: journal_name !== "" ? journal_name : undefined,
      journal_cover: journal_cover !== "" ? journal_cover : undefined,
    };
    const numVals = Object.values(itemToUpdate).filter(Boolean).length;
    if (numVals === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain either journal name or journal cover`,
        },
      });
    } else {
      JournalService.editJournal(knexInst, req.params.journal_id, itemToUpdate)
        .then((x) => {
          res.status(204).end();
        })
        .catch(next);
    }
  })
  .delete((req, res, next) => {
    const knexInst = req.app.get("db");
    JournalService.deleteJournal(knexInst, req.params.journal_id)
      .then((x) => res.status(204).end())
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
          res.json([]);
        }
        res.status(200).json(journals);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const knexInst = req.app.get("db");
    const user_id = req.params.user_id;
    console.log(req.body);
    const newJournal = {
      owner: user_id,
      journal_name: req.body.journal_name,
      journal_cover: req.body.journal_cover,
    };
    if (newJournal.journal_name.length < 0) {
      return res
        .status(400)
        .json({ error: { message: "Journal name is a required field" } });
    }
    JournalService.createNewJournal(knexInst, newJournal)
      .then((journal) => {
        res.status(201).json(journal);
      })
      .catch(next);
  });

module.exports = journalRouter;
