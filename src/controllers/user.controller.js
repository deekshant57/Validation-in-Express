const express = require("express");

const { body, validationResult } = require("express-validator");

const User = require("../models/user.model");

const router = express.Router();

router.post(
  "/",
  body("first_name").not().isEmpty().withMessage("First Name is required"),
  body("email").isEmail(),
  body("last_name").not().isEmpty().withMessage("Last name cannot be empty"),
  body("pincode")
    .not()
    .isEmpty()
    .withMessage("pincode cannot be empty")
    .isNumeric()
    .withMessage("pincode only contains numbers")
    .custom((value) => {
      if (value.length != 6) {
        throw new Error("Pincode must be of 6 numbers.");
      }
      return true;
    }),
  body("age")
    .not()
    .isEmpty()
    .withMessage("age cannot be empty")
    .isNumeric()
    .custom((value) => {
      if (value < 1 || value > 100) {
        throw new Error(
          "Age should be in the range of 1 to 100(not inclusive)"
        );
      }
    }),
  body("gender")
    .not()
    .isEmpty()
    .withMessage("gender cannot be empty")
    .custom((value) => {
      if (value != "Male" || value != "Female" || value != "Others") {
        throw new Error("Gender can be Male, Female or Others");
      }
      return true;
    }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  }
);

module.exports = router;
