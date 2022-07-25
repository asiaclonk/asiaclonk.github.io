import { Data_VTuber } from "../data/vtuber.js";

/**
 * Rolls a VTuber
 */
export function summon_vtuber(): void {
    let vtuber = Data_VTuber.List.getRandom();
    document.getElementById("name").innerHTML = vtuber.Name;
    document.getElementById("jpname").innerHTML = vtuber.NameJP;
    document.getElementById("oshimark").innerHTML = vtuber.OshiMark;
    document.getElementById("agency").innerHTML = vtuber.Agency?.Name ?? "Unaffiliated";
    document.getElementById("desc").innerHTML = vtuber.Note;
    let links = [];
    vtuber.Links.forEach((link: string) => links.push(`<a href="${link}" target="_blank">${link}</a>`))
    document.getElementById("links").innerHTML = links.join("</br>");
    document.getElementById("minstr").innerHTML = vtuber.StrengthCurve(1).toString();
    document.getElementById("maxstr").innerHTML = vtuber.StrengthCurve(100).toString();
}