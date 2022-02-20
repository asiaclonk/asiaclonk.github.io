/**
 * Main script loaded by the homepage. Controls Gameflow and UI.
 */
import { summon_vtuber } from "./party_management.js";

document.getElementById("roll").addEventListener("click", summon_vtuber);