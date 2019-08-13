function load() {
    view("home");
}

function craft() {
    let key = get("k").value;
    let data = get("d").value;
    let condition = get("c").value;
}

function lock(key, data) {
    let h = (key) => {
        let h = "";
        h += key.length;
        for (let i = 0; i < (key.length + 1) / 2; i++) {
            h += key[i].charCodeAt(0) + key[key.length - (1 + i)].charCodeAt(0);
        }
        if (key.length % 2 === 1) h += key[(key.length + 1) / 2].charCodeAt(0);
        return h;
    };
    let e = (key, data) => {
        if (data === "") return "";
        let rd = data[0];
        rd = String.fromCharCode(rd.charCodeAt(0) + key[data.length % key.length].charCodeAt(0));
        return rd + e(key, data.substr(1));
    };
    let j = function unlockSafe(key, safe) {
        if (safe === "") return "";
        return String.fromCharCode(safe[0].charCodeAt(0) - key[safe.length % key.length].charCodeAt(0)) + unlockSafe(key, safe.substr(1));
    };
    let safe = {
        hash: h(key),
        data: e(key, data),
        f: j.toString()
    };
    return encode(JSON.stringify(safe));
}

function unlock(key, safe) {
    let j = JSON.parse(decode(safe));
    eval(j.f);
    return unlockSafe(key, j.data);
}

function encode(str) {
    if (str.length === 0) return "";
    let c = str[0];
    let r = "";
    let cks = 0;
    c = c.charCodeAt(0);
    while (c > 0) {
        if ((c & 1) === 1) {
            r = "7" + r;
            cks++;
        } else {
            r = "8" + r;
            cks++;
            cks++;
        }
        c >>= 1;
    }
    return r + ["4", "5", "6"][Math.floor(magik(cks) * 3)] + encode(str.substr(1));
}

function decode(str) {
    if (str.length === 0) return "";
    let s = 0;
    let i;
    for (i = 0; i < str.length; i++) {
        let c = str[i];
        if (c === "4" || c === "5" || c === "6") break;
        s <<= 1;
        if (c === "7") s += 1;
    }
    return String.fromCharCode(s) + decode(str.substr(i + 1));
}

function magik(i) {
    let x = Math.sin(i) * 10000;
    return x - Math.floor(x);
}