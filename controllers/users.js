const { User, sequelize } = require("../models/index");
const bcrypt = require("bcrypt");
const cloudinary = require("../Middleware/Cloudinary");
const { use } = require("../src/Routes");
exports.register = async (req, res) => {
  try {
    const userByEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (userByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exist",
      });
    }

    const hashPassword = await bcrypt.hash(
      req.body.password,
      Number(process.env.SALT_ROUND)
    );

    const data = { ...req.body, password: hashPassword, role: "user" };

    const createUser = await User.create(data);

    return res.json({
      success: true,
      message: "Success register",
      result: createUser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Failed Register",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;

    if (email) {
      const userByEmail = await User.findOne({ where: { email } });

      if (!userByEmail) {
        return res.status(404).json({
          success: false,
          message: "Email not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userByEmail.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Password not valid",
        });
      } else if (isPasswordValid) {
        return res.json({
          success: true,
          message: "Success Login",
          result: {
            id: userByEmail.id,
            fullname: userByEmail.fullname,
            email: userByEmail.email,
            phone: userByEmail.phone,
            address: userByEmail.address,
            role: userByEmail.role,
          },
        });
      } else {
        return res.status(400).json({
          success: true,
          message: "Email cant be empty",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      selve: "Ada yang salah",
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userById = await User.findByPk(id);

    if (!userById) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    const userByEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (userByEmail && Number(userByEmail.id) !== Number(id)) {
      return res.status(400).json({
        success: false,
        messages: "Email already exist",
      });
    }
    
    const cldID = userById.cloudinary_id
    
    await cloudinary.uploader.destroy(cldID, function(error, result){ 
      console.log(result, error);
    })

      let updateData = req.body

    if (req.body.password) {
      const hashPassword = await bcrypt.hash(
        req.body.password,
        Number(process.env.SALT_ROUND)
      );

      updateData.password = hashPassword;
    }

    await userById.update(updateData);

    return res.json({
      success: true,
      message: "Success update profile",
      result: {
        id: userById.id,
        fullname: userById.fullname,
        email: userById.email,
        role: userById.role,
        avatar: userById.avatar,
        date_of_birth: userById.date_of_birth,
        address: userById.address
      },
    });
  } catch (error) {
    console.log(error);
    return res.json(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User found",
      result: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserAll = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json({
      success: true,
      message: "User found",
      result: users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res, public_id) => {
  try {      

    const user = await User.findByPk(req.params.id);    

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cldID = user.cloudinary_id
    
    await cloudinary.uploader.destroy(cldID, function(error, result){ 
      console.log(result, error);
    })

    await User.destroy({ where: { id: req.params.id } });

    return res.json({
      success: true,
      message: "Success Delete user",
      result: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        cloudinary_id: user.cloudinary_id
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
