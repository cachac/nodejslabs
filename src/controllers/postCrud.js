import Model from "../model/post.js";

export const CREATE = async (req, res, next) => {
  try {
    const input = req.body;
    const bitacora = {
      user: input.user,
      date: new Date(),
      detail: "Create post",
    };
    input.bitacora = [bitacora];
    input.metadata = {
      hash: (Math.random() + 1).toString(36).substring(7),
      num: Math.random(),
    };

    const newPost = new Model(input);
    await newPost.save();

    res.send("ok");
  } catch (error) {
    return next({
      status: 500,
      code: 1001,
      userMessage: "Error en el metodo CREATE",
      message: error,
    });
  }
};

export const READ_ALL = async (req, res, next) => {
  try {
    const posts = await Model.find({}, { title: 1, author: 1, createdAt: 1 });

    res.send(posts);
  } catch (error) {
    return next({
      status: 500,
      code: 1002,
      userMessage: "Ha ocurrido un error al leer los posts",
      message: error,
    });
  }
};

export const READ_BY_ID = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const post = await Model.findById(_id);

    res.send(post);
  } catch (error) {
    return next({
      status: 500,
      code: 1002,
      userMessage: "Ha ocurrido un error al leer los posts",
      message: error,
    });
  }
};

export const DELETE = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const post = await Model.deleteOne({ _id });

    res.send("ok");
  } catch (error) {
    return next({
      status: 500,
      code: 1002,
      userMessage: "Ha ocurrido un error al leer los posts",
      message: error,
    });
  }
};

export const UPDATE = async (req, res, next) => {
  try {
    const input = req.body;

    const response = await Model.updateOne(
      {
        _id: input._id,
      },

      {
        ...input,
        $push: {
          bitacora: {
            user: input.username,
            date: new Date(),
            detail: input.detail,
          },
        },
      }
    );

    res.send("ok");
  } catch (error) {
    return next({
      status: 500,
      code: 1003,
      userMessage: "Ha ocurrido un error al gaurdar el post",
      message: error,
    });
  }
};
