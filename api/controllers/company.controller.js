const db = require("../models");
const Companies = db.companies;
const Op = db.Sequelize.Op;

// Create company
exports.create = (req, res) => {
  const contactId = parseInt(req.params.contactId, 10);
  if (isNaN(contactId)) {
    return res.status(400).send({
      message: "Invalid contact ID provided",
    });
  }
  const company = {
    company_name: req.body.company_name,
    company_address: req.body.company_address,
    contactId: contactId,
  };

  Companies.create(company)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred",
      });
    });
};

// Get all companies
exports.findAll = (req, res) => {
  Companies.findAll({
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

// Get one company by id
exports.findOne = (req, res) => {
  Companies.findOne({
    where: {
      contactId: req.params.contactId,
      id: req.params.companyId,
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

// Update one company by id
exports.update = (req, res) => {
  const id = req.params.companyId;

  Companies.update(req.body, {
    where: { id: id, contactId: req.params.contactId },
  })
    .then((num) => {
      if (num == 1) {
        Companies.findOne({
          where: { id: id, contactId: req.params.contactId },
        })
          .then((updatedCompany) => {
            res.send(updatedCompany);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving updated company with id=" + id,
            });
          });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Company with id=" + id,
      });
    });
};

// Delete one company by id
exports.delete = (req, res) => {
  const id = req.params.companyId;

  Companies.destroy({
    where: { id: id, contactId: req.params.contactId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({});
      } else {
        res.send({
          message: `Cannot delete Company`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id,
      });
    });
};
