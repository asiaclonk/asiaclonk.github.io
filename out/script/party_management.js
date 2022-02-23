import { VTuber } from "../data/vtubers.js";
import { random_zerobase } from "../common/utility.js";
/**
 * Rolls a VTuber
 */
export function summon_vtuber() {
    var _a, _b;
    var vtuber = VTuber.List[random_zerobase(VTuber.List.length)];
    document.getElementById("name").innerHTML = vtuber.Name;
    document.getElementById("jpname").innerHTML = vtuber.NameJP;
    document.getElementById("oshimark").innerHTML = vtuber.OshiMark;
    document.getElementById("agency").innerHTML = (_b = (_a = vtuber.Agency) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : "Unaffiliated";
    document.getElementById("desc").innerHTML = vtuber.Description;
    var links = [];
    vtuber.Links.forEach((link) => links.push(`<a href="${link}" target="_blank">${link}</a>`));
    document.getElementById("links").innerHTML = links.join("</br>");
    document.getElementById("minstr").innerHTML = vtuber.StrengthCurve(1).toString();
    document.getElementById("maxstr").innerHTML = vtuber.StrengthCurve(100).toString();
}
//# sourceMappingURL=party_management.js.map