// api/db.js
import { createServer } from 'json-server';
import path from 'path';

export default function handler(req, res) {
  const server = createServer();
  // eslint-disable-next-line no-undef
  const router = server.router(path.join(process.cwd(), 'db.json')); // Reads your db.json file
  const middlewares = server.defaults();

  server.use(middlewares);
  server.use(router);

  server.listen(3000, () => {
    console.log('JSON Server is running');
  });

  res.status(200).json({ message: 'JSON Server is running' });
}
