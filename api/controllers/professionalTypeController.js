const db = require("../config/database");

    // metodo Post
exports.createProfessional = async (req, res) => {
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();
  const { descricao, situacao } = req.body;
  const { rows } = await db.query(
    "INSERT INTO professional_type (descricao, situacao, updatedAt,createdAt) VALUES ($1, $2, $3, $4)",
    [descricao, situacao, updatedAt, createdAt]
  );

  res.status(201).send({
    message: "Professional Type added successfully!",
    body: {
      professional: { descricao, situacao, updatedAt,createdAt }
    },
  });
};

    // metodo Get List
exports.listAllProfessionals = async (req, res) => {
    const query = req.query

    const { page = 1, limit = (Math.pow(10, 10)) } = query

    delete query.page

    delete query.limit
    const response = await db.query('SELECT * FROM professional_type ORDER BY id ASC LIMIT $1 OFFSET $2', [limit, ((page - 1) * limit)]);
    let ret = {
            docs: response.rows
        }
    res.status(200).send(ret);
};

    // metodo Get One
exports.findProfessionalById = async (req, res) => {
  const professionalId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM professional_type WHERE id = $1', [professionalId]);

    if (response.rows.length == 0) {
        res.status(400).send("No professional found with id " + professionalId);
    }

  res.status(200).send(response.rows[0]);
}

    // metodo Put
exports.updateProfessionalById = async (req, res) => {
  const updatedAt = new Date().toISOString();
  const professionalId = parseInt(req.params.id);
  const { descricao, situacao } = req.body;

  const response = await db.query(
    "UPDATE professional_type SET descricao = $1, situacao = $2, updatedAt = $3 WHERE id = $4",
    [descricao, situacao, updatedAt, professionalId]
  );

  res.status(200).send({ message: "Professional Type Updated Successfully!" });
};

    // metodo Delete
exports.deleteProfessionalById = async (req, res) => {
  const professionalId = parseInt(req.params.id);

    // Antes de fazer o delete, observa se existem registros utilizando professional_type especifico como FK
  const father = await db.query('SELECT * FROM professional WHERE tipodeprofissional = $1', [professionalId]);
  if (father.rows.length > 0) {
    res.status(400).send({ message: 'You cannot delete a parent row.' });
  }
  else {
      await db.query('DELETE FROM professional_type WHERE id = $1', [
        professionalId
      ]);

      res.status(200).send({ message: 'Professional Type deleted successfully!', professionalId });
  }
};