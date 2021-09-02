const db = require("../config/database");

exports.createProfessional = async (req, res) => {
  const { nome, telefone, email, situacao, tipoDeProfissional } = req.body;
  const { rows } = await db.query(
    "INSERT INTO professional (nome, telefone, email, situacao, updatedAt,createdAt, tipoDeProfissional) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [nome, telefone, email, situacao, updatedAt, createdAt, tipoDeProfissional]
  );

  res.status(201).send({
    message: "Professional added successfully!",
    body: {
      professional: { nome, telefone, email, situacao, updatedAt,createdAt, tipoDeProfissional }
    },
  });
};

exports.listAllProfessionals = async (req, res) => {
  const response = await db.query('SELECT * FROM professional ORDER BY id ASC');
  res.status(200).send(response.rows);
};

exports.findProfessionalById = async (req, res) => {
  const professionalId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM professional WHERE id = $1', [professionalId]);
  res.status(200).send(response.rows);
}

exports.updateProfessionalById = async (req, res) => {
  const professionalId = parseInt(req.params.id);
  const { nome, telefone, email, situacao, tipoDeProfissional } = req.body;

  const response = await db.query(
    "UPDATE professional SET nome = $1, telefone = $2, email = $3, situacao = $4, updatedAt = $5, tipoDeProfissional = $6 WHERE id = $7",
    [nome, telefone, email, situacao, updatedAt, tipoDeProfissional, professionalId]
  );

  res.status(200).send({ message: "Professional Updated Successfully!" });
};

exports.deleteProfessionalById = async (req, res) => {
  const professionalId = parseInt(req.params.id);
  await db.query('DELETE FROM professional WHERE id = $1', [
    professionalId
  ]);

  res.status(200).send({ message: 'Professional deleted successfully!', professionalId });
};