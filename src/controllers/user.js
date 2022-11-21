import { logger } from "../util/log.js";

export const TEST = async (req, res, next) => {
  try {
    const input = req.body;

    logger.info("input :>> ", { input });
    logger.warn("input :>> ", { input });
    logger.error("input :>> ", { input });
    // throw new Error("Error desconocido");
    throw { message: input };

    return res.send(`Nombre ingresado: ${input.name}`);
  } catch (err) {
    return next({
      code: 501,
      userMessage: "Lo sentimos, este error no es conocido por el sistema",
      message: err.message,
    });
  }
};
