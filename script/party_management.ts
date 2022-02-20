import { VTuber } from "../data/vtubers.js";
import { random_zerobase } from "./utility.js";

/**
 * Rolls a VTuber
 */
export function summon_vtuber(): void {
    var vtuber = VTuber.List[random_zerobase(VTuber.List.length)];
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