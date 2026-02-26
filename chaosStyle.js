/* ======================================================
   BALANCED RANDOM WORD STYLE (SMALLER & FIT)
====================================================== */

function rInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min }
function rFloat(min,max){ return Math.random()*(max-min)+min }

function rColor(){
  return `hsl(${rInt(0,360)}, ${rInt(40,85)}%, ${rInt(45,75)}%)`
}

function rSoftGradient(){
  return `linear-gradient(${rInt(0,360)}deg, ${rColor()}, ${rColor()})`
}

function rSoftShadow(){
  return `${rInt(-4,4)}px ${rInt(2,6)}px ${rInt(6,14)}px rgba(0,0,0,0.25)`
}

function applyChaosWordStyle(el){

  el.removeAttribute("style")

  el.style.display = "flex"
  el.style.alignItems = "center"
  el.style.justifyContent = "center"
  el.style.textAlign = "center"

  const boxWidth = el.clientWidth || 180
  const boxHeight = el.clientHeight || 120
  const wordLength = el.textContent.length || 5

  const baseSize = Math.min(boxWidth, boxHeight)

  // 🔹 lebih kecil dari sebelumnya
  let fontSize = baseSize * rFloat(0.25, 0.45)

  // 🔹 jika kata panjang, kecilkan lagi
  if(wordLength > 8){
    fontSize *= 0.8
  }
  if(wordLength > 12){
    fontSize *= 0.7
  }

  el.style.fontSize = fontSize + "px"
  el.style.fontWeight = rInt(500,800)
  el.style.letterSpacing = rInt(-1,2) + "px"
  el.style.lineHeight = "1.1"

  // ===== COLOR & BACKGROUND =====
  el.style.color = rColor()

  if(Math.random() < 0.5){
    el.style.background = rColor()
  } else {
    el.style.background = rSoftGradient()
  }

  el.style.backgroundSize = "cover"
  el.style.backgroundPosition = "center"

  // ===== BORDER =====
// ===== RANDOM BORDER =====

	const borderStyles = [
	  "solid",
	  "dashed",
	  "dotted",
	  "double",
	  "groove",
	  "ridge"
	]

	el.style.border = `
	  ${rInt(1,5)}px
	  ${borderStyles[rInt(0,borderStyles.length-1)]}
	  ${rColor()}
	`

	// ===== RANDOM SHAPE =====

	const shapeType = rInt(0,3)

	if(shapeType === 0){
	  // normal rounded
	  el.style.borderRadius = rInt(10,40) + "px"
	}
	else if(shapeType === 1){
	  // capsule
	  el.style.borderRadius = "999px"
	}
	else if(shapeType === 2){
	  // blob shape (4 value radius)
	  el.style.borderRadius = `
		${rInt(10,50)}% 
		${rInt(10,50)}% 
		${rInt(10,50)}% 
		${rInt(10,50)}%
	  `
	}
	else{
	  // asymmetric blob
	  el.style.borderRadius = `
		${rInt(20,60)}% ${rInt(20,60)}%
		${rInt(20,60)}% ${rInt(20,60)}%
	  `
	}

  // ===== SHADOW =====
  el.style.boxShadow = rSoftShadow()
  el.style.textShadow = `${rInt(-1,1)}px ${rInt(1,3)}px ${rInt(2,5)}px rgba(0,0,0,0.25)`

  // ===== TRANSFORM (lebih halus) =====
  el.style.transform = `
    rotate(${rInt(-3,3)}deg)
    scale(${rFloat(0.95,1.05)})
  `

  // ===== SPACING =====
  el.style.padding = rInt(12,22) + "px"

  el.style.opacity = rFloat(0.9,1)
  el.style.transition = "all 0.3s ease"
}