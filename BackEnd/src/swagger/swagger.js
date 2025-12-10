import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Planner API",
      version: "1.0.0",
    },
  },
  apis: ["./src/Routes/*.js"],
};

export const swaggerSpec = swaggerJsDoc(options);
export const swaggerUiSetup = swaggerUi.serve;
export const swaggerUiDocs = swaggerUi.setup(swaggerSpec);
