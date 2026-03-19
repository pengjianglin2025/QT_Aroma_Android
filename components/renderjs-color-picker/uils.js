const parseAlpha = (a) => a !== void 0 && !isNaN(+a) && 0 <= +a && +a <= 1 ? +a : 1;
export const HEX_REG = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
export function RGBAtoHSVA(r, g, b, a)  {
  r = boundValue(r, 255)
  g = boundValue(g, 255)
  b = boundValue(b, 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s
  let v = max

  const d = max - min
  s = max === 0 ? 0 : d / max

  if (max === min) {
    h = 0
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: h * 360,
    s: s,
    v: v,
    a: parseAlpha(a)
  }
}

export function HEXtoRGB(hex) {
	const result = HEX_REG.exec(hex)
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : null;
}

export function RGBtoHSV(r, g, b) {
	r = r / 255, g = g / 255, b = b / 255;
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	let h, s, v = max;

	let d = max - min;
	s = max == 0 ? 0 : d / max;

	if (max == min) {
		h = 0; // achromatic
	} else {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return [h, s, v];
}

export function RGBtoHEX(r, g, b) {
	let color = '#';[r, g, b].forEach(v => {
	    let hex = v.toString(16)
	    if (hex.length < 2) {
	      hex = '0' + hex
	    }
	    color += hex
	  })
	return color
}



export function HSVtoRGB(h, s, v) {
     var r, g, b;
     var i = Math.floor(h * 6);
     var f = h * 6 - i;
     var p = v * (1 - s);
     var q = v * (1 - f * s);
     var t = v * (1 - (1 - f) * s);
     switch (i % 6) {
       case 0:
         r = v, g = t, b = p;
         break;
       case 1:
         r = q, g = v, b = p;
         break;
       case 2:
         r = p, g = v, b = t;
         break;
       case 3:
         r = p, g = q, b = v;
         break;
       case 4:
         r = t, g = p, b = v;
         break;
       case 5:
         r = v, g = p, b = q;
         break;
     }
     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
   }


export function $(name) {
	const query = uni.createSelectorQuery().in(this);
	return query.select(name);
}


export function nodeInfo(name) {
	return new Promise((resolve) => {
		$.call(this, name).boundingClientRect(resolve).exec();
	})
}

export function queryCanvas(name) {
	return new Promise((resolve) => {
		$.call(this, name).node(resolve)
	})
}

export function mapRange(value, fromLower, fromUpper, toLower, toUpper) {
	return (toLower + (value - fromLower) * ((toUpper - toLower) / (fromUpper - fromLower)));
}

export function scientificToArtisticSmooth(hue) {
	return (
		hue < 35 ? hue * (60 / 35) :
		hue < 60 ? mapRange(hue, 35, 60, 60, 122) :
		hue < 120 ? mapRange(hue, 60, 120, 122, 165) :
		hue < 180 ? mapRange(hue, 120, 180, 165, 218) :
		hue < 240 ? mapRange(hue, 180, 240, 218, 275) :
		hue < 300 ? mapRange(hue, 240, 300, 275, 330) : mapRange(hue, 300, 360, 330, 360)
	);
}

export function makeGradient(colour1, colour2){
	return `background-image: -moz-linear-gradient(right, ${colour1} 0%, ${colour2} 100%);
	            background-image: -o-linear-gradient(right, ${colour1} 0%, ${colour2} 100%);
	            background-image: -webkit-linear-gradient(right, ${colour1} 0%, ${colour2} 100%);
	            background: -ms-linear-gradient(right,  ${colour1} 0%, ${colour2} 100%);
	            background: linear-gradient(right,  ${colour1} 0%, ${colour2} 100%);`;
}

export function praseEventPos(event){
	const {
		touches: [{
			clientX,
			clientY
		}]
	} = event;
	return [clientX, clientY]
}