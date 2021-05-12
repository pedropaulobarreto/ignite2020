import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create(): Promise<void> {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, is_admin, driver_license, created_at)
    values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, '12XX-TFF', 'now()')`
  );

  await connection.close();
}

create().then(() => {
  console.log("Admin user created!");
});
