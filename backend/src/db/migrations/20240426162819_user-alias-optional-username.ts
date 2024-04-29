import { Knex } from "knex";

import { TableName } from "../schemas";

export async function up(knex: Knex): Promise<void> {
  const isUserAliasTablePresent = await knex.schema.hasTable(TableName.SuperAdmin);
  if (isUserAliasTablePresent) {
    await knex.schema.alterTable(TableName.UserAliases, (t) => {
      t.string("username").nullable().alter();
    });
  }

  const isSuperAdminTablePresent = await knex.schema.hasTable(TableName.SuperAdmin);
  if (isSuperAdminTablePresent) {
    await knex.schema.alterTable(TableName.SuperAdmin, (t) => {
      t.boolean("trustSamlEmails").defaultTo(false);
      t.boolean("trustLdapEmails").defaultTo(false);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  if (await knex.schema.hasColumn(TableName.SuperAdmin, "trustSamlEmails")) {
    await knex.schema.alterTable(TableName.SuperAdmin, (t) => {
      t.dropColumn("trustSamlEmails");
    });
  }

  if (await knex.schema.hasColumn(TableName.SuperAdmin, "trustLdapEmails")) {
    await knex.schema.alterTable(TableName.SuperAdmin, (t) => {
      t.dropColumn("trustLdapEmails");
    });
  }
}
