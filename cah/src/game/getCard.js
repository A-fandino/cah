export default function get() {
  return fetch("../deck.json").then(resp => resp.json());
}

/* const fetch = require("node-fetch");
const url =
  "https://raw.githubusercontent.com/crhallberg/json-against-humanity/latest/cah-all-compact.json";
export default async function fetchData() {
  let response = await fetch(url);
  let jsonResponse = await response.json();
  return JSON.stringify(jsonResponse);
}
 */
/*
const fetch = require("node-fetch");
const url =
  "https://raw.githubusercontent.com/crhallberg/json-against-humanity/latest/cah-all-compact.json";
export default async function get() {
  let response = await fetch(url);
  let jsonResponse = await response.json();
  return jsonResponse;
}
*/
