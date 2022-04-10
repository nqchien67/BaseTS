import { IDecodeToken, ILogin } from "$types/interfaces";
import User from "$entities/User";
import { getConnection, getRepository, Like } from "typeorm";
import { stop } from "$helpers/response";
import { ErrorCode, UserStatus } from "$types/enums";
import { compareSync, hash, hashSync } from "bcryptjs";
import config from "$config";
import { sign, verify } from "jsonwebtoken";
import { IToken } from "$types/interfaces/auth";

export async function login(params: ILogin) {
  const userRepository = getRepository(User);
  const { email, password } = params;

  const user = await userRepository.findOne({
    where: { email },
    select: ["id", "password", "status"],
  });

  if (!user) {
    throw stop(ErrorCode.Email_Not_exist, "The email not exist");
  }

  const isCorrectPassword = compareSync(password, user.password);
  if (!isCorrectPassword) {
    throw stop(ErrorCode.Password_Not_True, "Password not true");
  }

  const token = generateToken(user);
  user.refreshToken = token.refreshToken;

  await userRepository.save(user);

  return token;
}

export async function register(params: ILogin) {
  return await getConnection().transaction(async (transaction) => {
    const userRepository = transaction.getRepository(User);

    const user = await userRepository.findOne({
      where: { email: params.email },
      select: ["id"],
    });

    if (user) throw stop(ErrorCode.Email_Already_exist, "the email used");

    const hashPassword = await hash(params.password, config.AUTH.SALT_ROUND);

    const data = {
      ...params,
      password: hashPassword,
      status: UserStatus.NOT_VERIFY,
    };
    const newUser = await userRepository.save(data);

    const { token, refreshToken } = await generateToken(newUser);
    newUser.refreshToken = refreshToken;
    await userRepository.save(newUser);

    return { token, refreshToken };
  });
}

export async function changePassword(params, userId: number) {
  const { newPassword, oldPassword } = params;
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
    select: ["id", "password"],
  });

  if (!user) {
    throw stop(ErrorCode.User_Not_Exist);
  }

  const isCorrectPassword = compareSync(oldPassword, user.password);
  if (!isCorrectPassword) {
    throw stop(ErrorCode.Password_Not_True);
  }

  const newPasswordHash = hashSync(newPassword, config.AUTH.SALT_ROUND);
  user.password = newPasswordHash;
  await userRepository.save(user);

  return true;
}

export async function getListUser(keyword) {
  const userRepository = getRepository(User);

  const result = await userRepository.find({
    where: [{ name: Like(`%${keyword}%`) }, { email: Like(`%${keyword}%`) }],
  });

  return result;
}

export async function getDetailUser(userId: number) {
  const userRepository = getRepository(User);

  const result = await userRepository.findOne({ where: { id: userId } });

  return result;
}

function generateToken(user: User): IToken {
  const dataEncode = { id: String(user.id) };
  let refreshToken = user.refreshToken;

  const token = generateAccessToken(dataEncode);

  try {
    verify(refreshToken, config.AUTH.ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
  } catch (error) {
    refreshToken = generateRefreshToken(dataEncode);
  }
  return { token, refreshToken };
}

function generateAccessToken(dataEncode: IDecodeToken): string {
  return sign(dataEncode, config.AUTH.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: config.AUTH.REFRES_TOKEN_TTL,
  });
}

function generateRefreshToken(dataEncode: IDecodeToken) {
  return sign(dataEncode, config.AUTH.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: config.AUTH.REFRES_TOKEN_TTL,
  });
}
