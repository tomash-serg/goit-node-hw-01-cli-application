const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const file = await fs.readFile(contactsPath);
  return JSON.parse(file);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.filter((el) => el.id.toString() === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactWithoutRemoved = contacts.filter((el) => el.id.toString() !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contactWithoutRemoved));
  return await listContacts();
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = crypto.randomUUID({ disableEntropyCache: false });
  contacts.push({ name, email, phone, id });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return await listContacts();
}

module.exports = { contactsPath, listContacts, getContactById, removeContact, addContact };
