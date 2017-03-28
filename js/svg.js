/*globals $ window document */

/*function createSVG() {
    let iconSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    iconSVG.id = 'Capa_1';
    iconSVG.setAttribute('viewBox', '0 0 400 50');
    iconSVG.innerHTML = `<g id="main-svg-icon">
    <path style="fill:#C03A2B;" d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543 c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503 c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"/>
    <path style="fill:#ED7161;" d="M6,18.078c-0.553,0-1-0.447-1-1c0-5.514,4.486-10,10-10c0.553,0,1,0.447,1,1s-0.447,1-1,1 c-4.411,0-8,3.589-8,8C7,17.631,6.553,18.078,6,18.078z"/>
    </g>`;

    document.getElementById('wrapper').appendChild(iconSVG);

    return iconSVG;
}*/

function createLifeIcons(count, SVGicon) {
    let useTag = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
        trX;

    useTag.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#main-svg-icon');

    for (let i = 0; i < count; i += 1) {
        let newIcon = useTag.cloneNode(true);
        trX = `translate(${i * 60} 0)`;
        newIcon.setAttributeNS(undefined, 'transform', trX);
        SVGicon.appendChild(newIcon);
    }
}

function createSVGstart() {
    let svg = document.getElementById('Capa_1');
    createLifeIcons(3, svg);
}

window.onload = createSVGstart();