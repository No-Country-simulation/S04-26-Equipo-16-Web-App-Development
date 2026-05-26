import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Backend",
      version: "1.0.0",
      description: "Documentación de la API con Swagger",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ["src/routes/**/*.ts"], // aquí leerá tus endpoints
});