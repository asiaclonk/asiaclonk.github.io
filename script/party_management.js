function summon_vtuber() {
    document.getElementById("vtuber").innerHTML = vtubers[random_zerobase(vtubers.length)][VTProp.Name];
}