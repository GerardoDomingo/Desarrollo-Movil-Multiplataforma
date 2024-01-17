function borrarUnDigito() {
    const pantalla = document.getElementById('pantalla');
    const contenidoPantalla = pantalla.textContent;
    if (contenidoPantalla.length > 0) {
        pantalla.textContent = contenidoPantalla.slice(0, -1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const pantalla = document.getElementById('pantalla');
    const botones = document.getElementById('botones');

    botones.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const valorBoton = e.target.innerText;

            if (valorBoton === '=') {
                try {
                    const expresion = pantalla.innerText;
                    if (expresion.includes('/ 0') || expresion.includes('% 0')) {
                        pantalla.innerText = 'Error: División por cero';
                    } else {
                        pantalla.innerText = evaluarExpresion(expresion);
                    }
                } catch (error) {
                    pantalla.innerText = 'Error';
                }
            } else if (valorBoton === '⌫') {
                borrarUnDigito();
            } else if (valorBoton === 'C') {
                borrarTodo();
            } else if (valorBoton === '.') {
                agregarPunto();
            } else {
                agregarCaracter(valorBoton);
            }
        }
    });

    function evaluarExpresion(expresion) {
        expresion = expresion.replace(/ /g, '');
        return Function(`return ${expresion}`)();
    }

    function agregarCaracter(caracter) {
        if (pantalla.innerText === '0') {
            pantalla.innerText = caracter;
        } else {
            pantalla.innerText += caracter;
        }
    }

    function agregarPunto() {
        const contenidoPantalla = pantalla.textContent;
        if (contenidoPantalla.length === 0 || contenidoPantalla === '-') {
            pantalla.textContent = '0.';
        } else if (!contenidoPantalla.includes('.')) {
            pantalla.textContent += '.';
        }
    }

    function borrarTodo() {
        pantalla.innerText = '0';
    }
});
