const express = require("express");
const router = express.Router();

const MailController = require("../controllers/MailController");

router.post("/sendmail", MailController.sendMail);
router.post("/sendmailall", MailController.sendMailToAll);
router.post("/sendforgototp", MailController.sendforgotOtp);
router.post("/verifyforgototp", MailController.verifyOtp);

module.exports = router;
