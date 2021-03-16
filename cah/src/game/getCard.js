export default function get() {
  return fetch("../deck.json").then((resp) => resp.json());
}
