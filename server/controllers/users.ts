import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "../../types/users/User";
import type { ResponsePostBody } from "../../types/users/ResponseBody";
import mySchemas from "../models/Schemas";

const INITIAL_RESPONSE_POST_BODY: ResponsePostBody = {
    message: "",
    status: 201,
  },
  SUCCESS_POST: ResponsePostBody = {
    message: "USER HAS BEEN SAVED",
    status: 201,
  },
  FAILED_POST: ResponsePostBody = {
    message: "ERROR OCCURED ON SAVING USER",
    status: 405,
  };

export async function addUserToDB(
  request: NextApiRequest,
  response: NextApiResponse<ResponsePostBody>
) {
  const responseBody: ResponsePostBody = INITIAL_RESPONSE_POST_BODY,
    user: User = request.body;

  const newUser = new mySchemas.Users({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password,
  });

  await newUser
    .save()
    .then(() => {
      responseBody.message = SUCCESS_POST.message;
      responseBody.status = SUCCESS_POST.status;
    })
    .catch((error: any) => {
      console.error(error);

      responseBody.message = FAILED_POST.message;
      responseBody.status = FAILED_POST.status;
    });

  response.status(responseBody.status).send(responseBody);
}     
