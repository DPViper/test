const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
// Create phone
exports.create = (req, res) => {
    const contactId = parseInt(req.params.contactId, 10);
    if (isNaN(contactId)) {
      return res.status(400).send({
        message: "Invalid contact ID provided",
      });
    }
    const phone = {
      phone_type: req.body.phone_type,
      phone_number: req.body.phone_number,
      contactId: contactId,
    };
  
    Phones.create(phone)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred",
        });
      });
  };
  
  // Get all phones
  exports.findAll = (req, res) => {
    Phones.findAll({
      where: {
        contactId: parseInt(req.params.contactId),
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred",
        });
      });
  };
  
  // Get one phone by id
  exports.findOne = (req, res) => {
    Phones.findOne({
      where: {
        contactId: req.params.contactId,
        id: req.params.phoneId,
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred",
        });
      });
  };
  
  // Update one phone by id
  exports.update = (req, res) => {
    const id = req.params.phoneId;
  
    Phones.update(req.body, {
      where: { id: id, contactId: req.params.contactId },
    })
      .then((num) => {
        if (num == 1) {
          Phones.findOne({
            where: { id: id, contactId: req.params.contactId },
          })
            .then((updatedPhone) => {
              res.send(updatedPhone);
            })
            .catch((err) => {
              res.status(500).send({
                message: "Error retrieving updated phone with id=" + id,
              });
            });
        } else {
          res.send({
            message: `Cannot update Phone with id=${id}. Maybe Phone was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Phone with id=" + id,
        });
      });
  };
  
  // Delete one phone by id
  exports.delete = (req, res) => {
    const id = req.params.phoneId;
  
    Phones.destroy({
      where: { id: id, contactId: req.params.contactId },
    })
      .then((num) => {
        if (num == 1) {
          res.send({});
        } else {
          res.send({
            message: `Cannot delete Phone`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Phone with id=" + id,
        });
      });
  };
  