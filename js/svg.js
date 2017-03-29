/*globals $ window document */

 

$(function createLifeIcons(count) {
    let useTag = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
        trX,
        SVGicon = document.getElementById('Capa_1');

    useTag.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#main-svg-icon');

    for (let i = 0; i < count; i += 1) {
        let newIcon = useTag.cloneNode(true);
        trX = `translate(${i * 60} 0)`;
        newIcon.setAttributeNS(undefined, 'transform', trX);
        SVGicon.appendChild(newIcon);
    }
}(3));