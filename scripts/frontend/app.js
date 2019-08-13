function load() {
    view("home");
}

function craft() {
    let key = get("k").value;
    let data = get("d").value;
    let condition = get("c").value;
}

function f(key, data) {
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
    f = (key, safe) => {
        if (safe === "") return "";
        let rd = safe[0];
        rd = String.fromCharCode(rd.charCodeAt(0) - key[safe.length % key.length].charCodeAt(0));
        return rd + f(key, safe.substr(1));
    };
    let safe = {
        hash: h(key),
        data: e(key, data),
        f: f.toString()
    };
    return encode(JSON.stringify(safe));
}

function toBin(v) {
    let s = "";
    while (v > 0) {
        if ((v & 1) === 1) {
            s = "1" + s;
        } else {
            s = "0" + s;
        }
        v >>= 1;
    }
    return s;
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
    let c = 0;
    
}

function magik(i) {
    let x = Math.sin(i) * 10000;
    return x - Math.floor(x);
}