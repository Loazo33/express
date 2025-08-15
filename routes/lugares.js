
const express = require('express');
const router = express.Router();
const pool = require('../db');

//  Listar todos los lugares
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT lugares.id, lugares.nombre, lugares.direccion, sectores.nombre AS sector
       FROM lugares
       JOIN sectores ON lugares.sector_id = sectores.id`
    );
    res.render('inicio', { lugares: result.rows });
    //console.log(result)
  } catch (error) {
    console.error(error);
    res.send("Error al obtener los lugares");
  }
});

//  Formulario para agregar lugar
router.get('/nuevo', async (req, res) => {
  const sectores = await pool.query('SELECT * FROM sectores');
  res.render('nuevo.ejs', { sectores: sectores.rows });
});

//  Guardar nuevo lugar
router.post('/', async (req, res) => {
  const { nombre, direccion, sector_id } = req.body;
  await pool.query('INSERT INTO lugares (nombre, direccion, sector_id) VALUES ($1, $2, $3)',
    [nombre, direccion, sector_id]);
  res.redirect('/lugares');
});

//  Editar lugar
router.get('/edit/:id', async (req, res) => {
  const lugar = await pool.query('SELECT * FROM lugares WHERE id = $1', [req.params.id]);
  const sectores = await pool.query('SELECT * FROM sectores');
  res.render('editar', { lugar: lugar.rows[0], sectores: sectores.rows });
});

//  Actualizar lugar
router.put('/edit/:id', async (req, res) => {
  const { nombre, direccion, sector_id } = req.body;
  await pool.query(
    'UPDATE lugares SET nombre = $1, direccion = $2, sector_id = $3 WHERE id = $4',
    [nombre, direccion, sector_id, req.params.id]
  );
  res.redirect('/lugares');
});

//  Eliminar lugar
router.get('/delete/:id', async (req, res) => {
  await pool.query('DELETE FROM lugares WHERE id = $1', [req.params.id]);
  res.redirect('/lugares');
});

module.exports = router;
