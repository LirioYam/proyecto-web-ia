"use strict";

const API = "https://rickandmortyapi.com/api/character/";
const byId = (id) => document.getElementById(id);
const ui = {
  form: byId("search-form"), search: byId("search"), status: byId("status"),
  species: byId("species"), grid: byId("characters"), count: byId("results-count"),
  feedback: byId("feedback"), message: byId("message"), retry: byId("retry"),
  pagination: byId("pagination"), previous: byId("previous"), next: byId("next"),
  page: byId("page-label"), all: byId("all-view"), favorites: byId("favorites-view"),
  favoriteCount: byId("favorite-count"), warning: byId("storage-warning")
};
const state = { items: [], page: 1, pages: 0, total: 0, favoritesView: false,
  filters: { name: "", status: "", species: "" } };
const favorites = new Map();
let controller;
let requestNumber = 0;
const statusLabels = { Alive: "Vivo", Dead: "Muerto", unknown: "Desconocido" };
const speciesLabels = { Human: "Humano", Alien: "Alien", Humanoid: "Humanoide", Robot: "Robot", Animal: "Animal", Disease: "Enfermedad", unknown: "Desconocida", "Mythological Creature": "Criatura mitológica" };
const genderLabels = { Male: "Masculino", Female: "Femenino", Genderless: "Sin género", unknown: "Género desconocido" };

// Los datos de la API se insertan como texto, sin construir HTML con ellos.
function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}
function feedback(message = "", retry = false) {
  ui.feedback.hidden = !message;
  ui.message.textContent = message;
  ui.retry.hidden = !retry;
}
function favoriteButton(button, character) {
  const saved = favorites.has(character.id);
  button.textContent = saved ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(saved));
  button.setAttribute("aria-label", (saved ? "Quitar de favoritos a " : "Guardar en favoritos a ") + character.name);
}
function card(character) {
  const article = node("article", "character-card");
  const portrait = node("div", "portrait");
  const image = node("img");
  image.src = character.image;
  image.alt = "Retrato de " + character.name;
  image.loading = "lazy";
  image.width = 300;
  image.height = 300;
  const favorite = node("button", "favorite-button");
  favorite.type = "button";
  favorite.dataset.id = character.id;
  favoriteButton(favorite, character);
  portrait.append(image, node("span", "character-id", "EXP. " + String(character.id).padStart(3, "0")), favorite);
  const body = node("div", "card-body");
  const status = node("span", "status-badge " + character.status.toLowerCase(), statusLabels[character.status] || character.status);
  const description = (speciesLabels[character.species] || character.species) + " · " + (genderLabels[character.gender] || character.gender);
  const location = node("div", "card-location");
  location.append(node("span", "", "ÚLTIMA UBICACIÓN"), node("p", "", character.location.name === "unknown" ? "Desconocida" : character.location.name));
  body.append(status, node("h3", "", character.name), node("p", "character-description", description), location);
  article.append(portrait, body);
  return article;
}
function visibleCharacters() {
  if (!state.favoritesView) return state.items;
  const f = state.filters;
  return [...favorites.values()].filter((p) =>
    p.name.toLowerCase().includes(f.name.toLowerCase()) &&
    (!f.status || p.status.toLowerCase() === f.status) &&
    (!f.species || p.species.toLowerCase().includes(f.species.toLowerCase()))
  );
}
function render() {
  const items = visibleCharacters();
  ui.grid.replaceChildren(...items.map(card));
  ui.favoriteCount.textContent = favorites.size;
  ui.count.textContent = state.favoritesView
    ? items.length + " favoritos encontrados · " + favorites.size + " guardados"
    : state.total + " personajes encontrados · " + items.length + " en esta página";
  ui.pagination.hidden = state.favoritesView || state.pages < 2;
  ui.previous.disabled = state.page <= 1;
  ui.next.disabled = state.page >= state.pages;
  ui.page.textContent = "Página " + state.page + " de " + state.pages;
  feedback(items.length ? "" : state.favoritesView && favorites.size === 0
    ? "Tu colección está por comenzar. Guarda un personaje con el corazón para encontrarlo aquí."
    : "No encontramos personajes con esos filtros. Prueba otro nombre o limpia los filtros.");
}

// Cada consulta tiene un identificador para impedir que una respuesta antigua reemplace a la nueva.
async function loadCharacters() {
  const request = ++requestNumber;
  if (controller) controller.abort();
  const activeController = new AbortController();
  controller = activeController;
  const timeout = setTimeout(() => activeController.abort(), 15000);
  state.items = [];
  ui.grid.replaceChildren();
  ui.grid.setAttribute("aria-busy", "true");
  ui.pagination.hidden = true;
  ui.count.textContent = "Consultando el archivo…";
  feedback("Abriendo un portal a la API…");
  const params = new URLSearchParams({ page: state.page });
  Object.entries(state.filters).forEach(([key, value]) => { if (value) params.set(key, value); });
  try {
    const response = await fetch(API + "?" + params, { signal: activeController.signal });
    if (request !== requestNumber || state.favoritesView) return;
    if (response.status === 404) {
      state.items = [];
      state.total = 0;
      state.pages = 0;
      render();
      return;
    }
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();
    if (request !== requestNumber || state.favoritesView) return;
    if (!Array.isArray(data.results) || !data.info) throw new Error("Respuesta inesperada");
    state.items = data.results;
    state.total = data.info.count;
    state.pages = data.info.pages;
    render();
  } catch (error) {
    if (request !== requestNumber || state.favoritesView) return;
    ui.count.textContent = "Consulta interrumpida";
    feedback(activeController.signal.aborted
      ? "La API tardó demasiado. Vuelve a intentarlo."
      : "No pudimos consultar la API. Revisa tu conexión y vuelve a intentarlo.", true);
  } finally {
    clearTimeout(timeout);
    if (request === requestNumber) ui.grid.setAttribute("aria-busy", "false");
  }
}
function applyFilters() {
  state.filters = { name: ui.search.value.trim(), status: ui.status.value, species: ui.species.value };
  state.page = 1;
  if (state.favoritesView) render(); else loadCharacters();
}
function switchView(favoritesView) {
  state.favoritesView = favoritesView;
  state.page = 1;
  ui.all.classList.toggle("active", !favoritesView);
  ui.favorites.classList.toggle("active", favoritesView);
  ui.all.setAttribute("aria-pressed", String(!favoritesView));
  ui.favorites.setAttribute("aria-pressed", String(favoritesView));
  if (favoritesView) {
    requestNumber++;
    if (controller) controller.abort();
    ui.grid.setAttribute("aria-busy", "false");
    render();
  } else loadCharacters();
}
ui.form.addEventListener("submit", (event) => { event.preventDefault(); applyFilters(); });
ui.status.addEventListener("change", applyFilters);
ui.species.addEventListener("change", applyFilters);
byId("clear").addEventListener("click", () => { ui.form.reset(); applyFilters(); });
ui.all.addEventListener("click", () => switchView(false));
ui.favorites.addEventListener("click", () => switchView(true));
ui.previous.addEventListener("click", () => { if (state.page > 1) { state.page--; loadCharacters(); } });
ui.next.addEventListener("click", () => { if (state.page < state.pages) { state.page++; loadCharacters(); } });
ui.retry.addEventListener("click", loadCharacters);
ui.grid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  const id = Number(button.dataset.id);
  const character = state.items.find((p) => p.id === id) || favorites.get(id);
  if (!character) return;
  if (favorites.has(id)) favorites.delete(id); else favorites.set(id, character);
  ui.favoriteCount.textContent = favorites.size;
  if (state.favoritesView) {
    render();
    const nextButton = ui.grid.querySelector("button");
    (nextButton || ui.favorites).focus();
  } else favoriteButton(button, character);
});
loadCharacters();

// Persistencia: guardamos una copia de los personajes, no solo sus identificadores.
// Así la colección se puede consultar sin volver a pedir esos datos a la API.
const STORAGE_KEY = "ciudadela-favoritos-v1";
function storageWarning(message) {
  ui.warning.textContent = message;
  ui.warning.hidden = !message;
}
function validFavorite(p) {
  return p && Number.isInteger(p.id) && p.id > 0 &&
    typeof p.name === "string" && typeof p.species === "string" &&
    typeof p.gender === "string" && ["Alive", "Dead", "unknown"].includes(p.status) &&
    typeof p.image === "string" && p.image.startsWith(API + "avatar/") &&
    p.location && typeof p.location.name === "string";
}
function readFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved) || !saved.every(validFavorite)) throw new Error("Datos guardados inválidos");
    favorites.clear();
    saved.forEach((p) => favorites.set(p.id, p));
    ui.favoriteCount.textContent = favorites.size;
    storageWarning("");
  } catch (error) {
    storageWarning("No pudimos leer los favoritos guardados. Puedes usar una colección temporal en esta sesión.");
  }
}
function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites.values()]));
    storageWarning("");
  } catch (error) {
    storageWarning("El navegador no permitió guardar los favoritos. Se conservarán solo durante esta sesión.");
  }
}
// Este manejador se ejecuta después de actualizar la colección en memoria.
ui.grid.addEventListener("click", (event) => {
  if (event.target.closest("button[data-id]")) saveFavorites();
});
readFavorites();
