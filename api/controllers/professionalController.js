const db = require("../config/database");

exports.createProfessional = async (req, res) => {
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const { nome, telefone, email, situacao, professional_type } = req.body;
    const { rows } = await db.query(
        "INSERT INTO professional (nome, telefone, email, situacao, updatedAt, createdAt, tipoDeProfissional) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [nome, telefone, email, situacao, updatedAt, createdAt, professional_type]
    );

    res.status(201).send({
        message: "Professional added successfully!",
        body: {
          professional: { nome, telefone, email, situacao, updatedAt, createdAt, professional_type }
        },
    });
};

exports.listAllProfessionals = async (req, res) => {
    const query = req.query

    const { page = 1, limit = (Math.pow(10, 10)) } = query

    delete query.page

    delete query.limit
    const response = await db.query('SELECT * FROM professional ORDER BY id ASC LIMIT $1 OFFSET $2', [limit, ((page - 1) * limit)]);

    let array = []

    const someFunction = (myArray) => {
      const promises = myArray.map(async (o) => {
        const professionalType = await db.query('SELECT * FROM professional_type WHERE id = $1', [o.tipodeprofissional]);
        return {
          id: o.id,
          nome: o.nome,
          telefone: o.telefone,
          email: o.email,
          situacao: o.situacao,
          createdAt: o.createdat,
          updatedAt: o.updatedat,
          professional_type: professionalType.rows[0]
        }
      });
      return Promise.all(promises);
  }

    array = await someFunction(response.rows)

    let ret = {
        docs: array
    }
    res.status(200).send(ret);
};

exports.findProfessionalById = async (req, res) => {
  const professionalId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM professional WHERE id = $1', [professionalId]);

    if (response.rows.length == 0) {
        res.status(400).send("No professional found with id " + professionalId);
    }

    let body = {}

    const someFunction = async (o) => {
    console.log(o)
      const professionalType = await db.query('SELECT * FROM professional_type WHERE id = $1', [o.tipodeprofissional]);
      return {
          id: o.id,
          nome: o.nome,
          telefone: o.telefone,
          email: o.email,
          situacao: o.situacao,
          createdAt: o.createdat,
          updatedAt: o.updatedat,
          professional_type: professionalType.rows[0]
      }
  }
    body = await someFunction(response.rows[0])

    res.status(200).send(body);
}

exports.updateProfessionalById = async (req, res) => {
  const updatedAt = new Date().toISOString();
  const professionalId = parseInt(req.params.id);
  const { nome, telefone, email, situacao, professional_type } = req.body;

  const response = await db.query(
    "UPDATE professional SET nome = $1, telefone = $2, email = $3, situacao = $4, updatedAt = $5, tipoDeProfissional = $6 WHERE id = $7",
    [nome, telefone, email, situacao, updatedAt, professional_type, professionalId]
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