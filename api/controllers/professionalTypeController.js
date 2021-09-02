const db = require("../config/database");

exports.createProfessional = async (req, res) => {
  const { descricao, situacao } = req.body;
  const { rows } = await db.query(
    "INSERT INTO professional_type (descricao, situacao, updatedAt,createdAt) VALUES ($1, $2, $3, $4)",
    [descricao, situacao, updatedAt,createdAt]
  );

  res.status(201).send({
    message: "Professional Type added successfully!",
    body: {
      professional: { descricao, situacao, updatedAt,createdAt }
    },
  });
};

exports.listAllProfessionals = async (req, res) => {
  const response = await db.query('SELECT * FROM professional_type ORDER BY id ASC');
  res.status(200).send(response.rows);
};

exports.findProfessionalById = async (req, res) => {
  const professionalId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM professional_type WHERE id = $1', [professionalId]);
  res.status(200).send(response.rows);
}

exports.updateProfessionalById = async (req, res) => {
  const professionalId = parseInt(req.params.id);
  const { descricao, situacao, updatedAt,createdAt } = req.body;

  const response = await db.query(
    "UPDATE professional_type SET descricao = $1, situacao = $2, updatedAt = $3 WHERE id = $4",
    [descricao, situacao, updatedAt, professionalId]
  );

  res.status(200).send({ message: "Professional Type Updated Successfully!" });
};

exports.deleteProfessionalById = async (req, res) => {
  const father = await db.query('SELECT * FROM professional WHERE professional_type = $1', [professionalId]);
  if (father.rows.length > 0) {
    res.status(400).send({ message: 'You cannot delete a parent row.' });
  }
  else {
      const professionalId = parseInt(req.params.id);
      await db.query('DELETE FROM professional_type WHERE id = $1', [
        professionalId
      ]);

      res.status(200).send({ message: 'Professional Type deleted successfully!', professionalId });
  }
};