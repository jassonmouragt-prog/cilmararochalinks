(() => {
 const rect = selector => document.querySelector(selector)?.getBoundingClientRect().toJSON() ?? null;
 const hero = document.querySelector('.hero');
 return {viewport: [innerWidth,innerHeight],scrollWidth:document.documentElement.scrollWidth,overflow:document.documentElement.scrollWidth>innerWidth,layout:hero.className,hero:rect('.hero'),photo:rect('.hero-portrait-wrap'),text:rect('.hero-content'),imageLoaded:document.querySelector('.hero-portrait')?.naturalWidth>0,heading:rect('#hero-title'),portraitRadius:document.querySelector('.hero-portrait-wrap') ? getComputedStyle(document.querySelector('.hero-portrait-wrap')).borderRadius : null};
})()
