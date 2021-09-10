const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { exit } = require("process");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const file = await fs.readFile(contactsPath);
    return JSON.parse(file);
  } catch (error) {
    console.warn(error.message);
    exit(1);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.filter((el) => el.id.toString() === contactId);
  } catch (error) {
    console.warn(error.message);
    exit(1);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactWithoutRemoved = contacts.filter((el) => el.id.toString() !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contactWithoutRemoved));
    return await listContacts();
  } catch (error) {
    console.warn(error.message);
    exit(1);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();
    const id = crypto.randomUUID({ disableEntropyCache: false });
    contacts.push({ name, email, phone, id });
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return await listContacts();
  } catch (error) {
    console.warn(error.message);
    exit(1);
  }
}

module.exports = { contactsPath, listContacts, getContactById, removeContact, addContact };
