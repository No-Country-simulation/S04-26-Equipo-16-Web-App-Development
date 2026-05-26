import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Obtener usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/users", (_, res) => {
  res.json([
    { id: 1, name: "Juan" },
    { id: 2, name: "Ana" },
  ]);
});

export default router;