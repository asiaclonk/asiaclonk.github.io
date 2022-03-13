import { random_zerobase } from "../common/utility.js";
import { Database } from "../data/database.js";

/**
 * Rolls a VTuber
 */
export function summon_vtuber(): void {
    var vtuber = Database.VTubers.List[random_zerobase(Database.VTubers.List.length)];
    document.getElementById("name").innerHTML = vtuber.Name;
    document.getElementById("jpname").innerHTML = vtuber.NameJP;
    document.getElementById("oshimark").innerHTML = vtuber.OshiMark;
    document.getElementById("agency").innerHTML = vtuber.Agency?.Name ?? "Unaffiliated";
    document.getElementById("desc").innerHTML = vtuber.Description;
    var links = [];
    vtuber.Links.forEach((link) => links.push(`<a href="${link}" target="_blank">${link}</a>`))
    document.getElementById("links").innerHTML = links.join("</br>");
    document.getElementById("minstr").innerHTML = vtuber.StrengthCurve(1).toString();
    document.getElementById("maxstr").innerHTML = vtuber.StrengthCurve(100).toString();
}