

const pool = require('./db');

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa ✅:', result.rows[0]);
  } catch (err) {
    console.error('Error en la conexión ❌:', err);
  } finally {
    pool.end();
  }
})();
