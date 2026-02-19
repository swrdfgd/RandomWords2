/* ======================================================
   FONT WORD ENGINE
   Requires opentype.js
====================================================== */

let FONT_ENGINE_CACHE = {
  fonts: [],
  loaded: false
};

const GOOGLE_API_KEY = "AIzaSyBTPAz_OQr140D1rtD0o6vwM63XohXw8Ds";

/* ======================================================
   LOAD GOOGLE FONTS LIST (ONCE)
====================================================== */

async function loadGoogleFontsList(){

  if(FONT_ENGINE_CACHE.loaded) return;

  const res = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_API_KEY}`
  );

  const data = await res.json();

  FONT_ENGINE_CACHE.fonts =
    data.items.filter(f => f.files && f.files.regular);

  FONT_ENGINE_CACHE.loaded = true;
}

/* ======================================================
   DETECT UNICODE RANGES
====================================================== */

function detectUnicodeRanges(codepoints){

  const sorted = [...new Set(codepoints)].sort((a,b)=>a-b);

  const ranges = [];

  let start = sorted[0];
  let prev  = sorted[0];

  for(let i=1;i<sorted.length;i++){

    const cp = sorted[i];

    if(cp === prev + 1){
      prev = cp;
    } else {
      ranges.push([start, prev]);
      start = cp;
      prev  = cp;
    }
  }

  ranges.push([start, prev]);

  return ranges;
}

/* ======================================================
   GENERATE RANDOM WORD FROM FONT
====================================================== */

async function randomWordFromFont(){

  await loadGoogleFontsList();

  if(!FONT_ENGINE_CACHE.fonts.length)
    throw "No fonts available";

  const fontMeta =
    FONT_ENGINE_CACHE.fonts[
      Math.floor(Math.random()*FONT_ENGINE_CACHE.fonts.length)
    ];

  const fontURL = fontMeta.files.regular;

  return new Promise((resolve, reject)=>{

    opentype.load(fontURL, function(err, font){

      if(err) return reject(err);

      const codepoints = [];

      for(let i=0;i<font.glyphs.length;i++){

        const g = font.glyphs.get(i);

        if(
          g.unicode &&
          g.unicode > 0x20 &&             // skip control
          !(g.unicode >= 0xE000 && g.unicode <= 0xF8FF) // skip private use
        ){
          codepoints.push(g.unicode);
        }
      }

      if(!codepoints.length)
        return reject("Font has no usable glyphs");

      const ranges = detectUnicodeRanges(codepoints);

      let word = "";
      const len = Math.floor(Math.random()*6)+3;

      for(let i=0;i<len;i++){

        const r =
          ranges[Math.floor(Math.random()*ranges.length)];

        const cp =
          Math.floor(Math.random()*(r[1]-r[0]+1)) + r[0];

        word += String.fromCodePoint(cp);
      }

      resolve({
        word,
        source: `Font (${fontMeta.family})`,
        fontFamily: fontMeta.family,
        fontURL: fontURL,
        unicodeRanges: ranges,
        isFontGenerated: true
      });

    });

  });
}

/* ======================================================
   APPLY EXACT FONT (FOR FONT-GENERATED WORDS)
====================================================== */

function applyExactFont(element, data){

  const style = document.createElement("style");

  style.innerHTML = `
    @font-face {
      font-family: "${data.fontFamily}";
      src: url(${data.fontURL});
    }
  `;

  document.head.appendChild(style);

  element.style.fontFamily = `"${data.fontFamily}"`;
}

/* ======================================================
   EXPORTS (GLOBAL)
====================================================== */

window.randomWordFromFont = randomWordFromFont;
window.applyExactFont = applyExactFont;
