import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Travel Planner API",
      version: "1.0.0",
    },

    // ❗ COMPONENTS BURADA OLMALIDIR (definition içində)
    components: { 
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    // ❗ GLOBAL SECURITY də BURADA OLMALIDIR
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/Routes/*.js"], // Sənin folder strukturuna uyğunlaşdırdım
};

export const swaggerSpec = swaggerJsDoc(options);
