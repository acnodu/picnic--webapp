import { isUser } from "@/server/utils/isAuth";

export default defineEventHandler(async (event) => {
  isUser(event);

  const users = [
    { id: 1, email: "test@mail.com" },
    { id: 2, email: "user@mail.com" },
  ];
  return users;
});
