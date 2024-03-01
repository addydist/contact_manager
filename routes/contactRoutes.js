const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  deleteContact,
  updateContact,
  getIndividualContact,
} = require("../controller/contactController");
const validateToken = require("../middleware/validateTokenhandler");


router.use(validateToken)
router.route("/").get(getContact);
router.route("/").post(createContact);
router.route("/:id").get(getIndividualContact).put(updateContact).delete(deleteContact);
// router.route("/").get(getContact);
// router.route("/").post(CreateContact);
// router.route("/:id").get(getIndividualContact);

// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);

module.exports = router;
