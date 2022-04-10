export const loginSchema: AjvSchema = {
  type: "object",
  required: ["email", "password"],
  additionalProperties: false,
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 32,
    },
  },
};

export const registerSchema: AjvSchema = {
  type: "object",
  required: ["email", "password", "name"],
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 255,
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      minLength: 6,
      maxLength: 32,
    },

    phone: {
      pattern: "^[+]*[0-9]{10,12}$",
      minLength: 1,
      maxLength: 20,
    },
  },
};

export const changePasswordSchema: AjvSchema = {
  type: "object",
  required: ["oldPassword", "newPassword"],
  additionalProperties: false,
  properties: {
    oldPassword: {
      type: "string",
      minLength: 6,
      maxLength: 32,
    },
    newPassword: {
      type: "string",
      minLength: 6,
      maxLength: 32,
    },
  },
};

export const getListUserSchema: AjvSchema = {
  type: "string",
};

export const getDetailUserSchema: AjvSchema = {
  type: "string",
};
