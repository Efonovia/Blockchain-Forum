const Joi = require("joi");

const UserRegValidation = (data) => {
  const schema = Joi.object().keys({
    username: Joi.allow(),
    // username: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

const UserLoginValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const ResetPassValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
  });
  return schema.validate(data);
};

const passwordValidation = (data) => {
  const schema = Joi.object().keys({
    id: Joi.allow().optional(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const profilePictureValidation = (data) => {
  const schema = Joi.object().keys({
    id: Joi.required(),
    profile_picture: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const userProfileValidation = (data) => {
  const schema = Joi.object().keys({
    id: Joi.required(),
    instagram: Joi.optional().allow(),
    twitter: Joi.optional().allow(),
    bio: Joi.optional().allow(),
  });
  return schema.validate(data);
};

const userInstagramValidation = (data) => {
  const schema = Joi.object().keys({
    id: Joi.required(),
    instagram: Joi.optional().allow(),
  });
  return schema.validate(data);
};

const userFullnameValidation = (data) => {
  const schema = Joi.object().keys({
    id: Joi.required(),
    fullname: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

const updateAvatarValidation = (data) => {
  const schema = Joi.object().keys({
    username: Joi.required(),
    image: Joi.allow().optional(),
  });
  return schema.validate(data);
};

const userTwitterValidation = (data) => {
  const schema = Joi.object().keys({
    id: Joi.required(),
    twitter: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

const userBioValidation = (data) => {
  const schema = Joi.object().keys({
    id: Joi.required(),
    bio: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

const resetPass = (data) => {
  const schema = Joi.object().keys({
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const RegValidation = (data) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    referral: Joi.optional(),
    password: Joi.string().min(6).required(),
  });

  // VALIDATE ADMIN USERS INPUT DATA
  return schema.validate(data);
};

const blogValidationUser = (data) => {
  const schema = Joi.object().keys({
    user_id: Joi.number().required(),
    content: Joi.string().required(),
    image: Joi.allow().optional(),
    ref: Joi.allow().optional(),
  });
  return schema.validate(data);
};

const blogValidationComment  = (data) => {
  const schema = Joi.object().keys({
    user_id: Joi.number().required(),
    comments: Joi.string().required(),
    blog_id: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports = {
  updateAvatarValidation,
  blogValidationComment,
  blogValidationUser,
  userProfileValidation,
  userInstagramValidation,
  userTwitterValidation,
  userBioValidation,
  userFullnameValidation,
  profilePictureValidation,
  passwordValidation,
  ResetPassValidation,
  UserRegValidation,
  UserLoginValidation,
};
