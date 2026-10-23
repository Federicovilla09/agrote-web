// Portada del inicio: el hero ocupa toda la pantalla y el primer gesto de scroll
// (rueda, deslizar el dedo o flecha abajo) "abre" el sitio con una transición
// animada hasta la primera sección. Después, el scroll es normal.

const CLAVE = "agrote-portada-vista"; // recuerda que ya se vio en esta visita
const DURACION = 900; // milisegundos de la transición

// Curva de aceleración: arranca suave, acelera y frena suave (ease-in-out)
const suavizar = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Scroll animado con nuestra propia curva y duración
function animarScroll(destino: number, alTerminar: () => void) {
    const inicio = window.scrollY;
    const distancia = destino - inicio;
    const comienzo = performance.now();

    function paso(ahora: number) {
        const progreso = Math.min((ahora - comienzo) / DURACION, 1);
        window.scrollTo({
            top: inicio + distancia * suavizar(progreso),
            behavior: "instant",
        });
        if (progreso < 1) requestAnimationFrame(paso);
        else alTerminar();
    }
    requestAnimationFrame(paso);
}

export function iniciarPortada(hero: HTMLElement) {
    const raiz = document.documentElement;
    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    const yaVista = sessionStorage.getItem(CLAVE) === "1";
    const entraConAncla = window.location.hash.length > 1; // por ejemplo, /#contacto

    let animando = false;
    let inicioToque = 0;
    let ultimoEvento = 0;

    // ---------- Bloqueo durante la transición ----------
    // Los touchpads siguen mandando eventos de "inercia" después del gesto.
    // Mientras animamos, los frenamos todos para que no compitan con la animación.
    const TECLAS_SCROLL = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        " ",
        "Home",
        "End",
    ];

    function frenar(evento: Event) {
        ultimoEvento = performance.now();
        evento.preventDefault();
    }
    function frenarTecla(evento: KeyboardEvent) {
        if (TECLAS_SCROLL.includes(evento.key)) evento.preventDefault();
    }

    function iniciarBloqueo() {
        window.addEventListener("wheel", frenar, { passive: false });
        window.addEventListener("touchmove", frenar, { passive: false });
        window.addEventListener("keydown", frenarTecla);
    }

    function terminarBloqueo() {
        // Esperamos a que la inercia se detenga: 150 ms sin eventos nuevos
        const esperar = () => {
            if (performance.now() - ultimoEvento < 150) {
                window.setTimeout(esperar, 50);
                return;
            }
            window.removeEventListener("wheel", frenar);
            window.removeEventListener("touchmove", frenar);
            window.removeEventListener("keydown", frenarTecla);
        };
        esperar();
    }

    // Altura del header fijo, para que la transición no termine con la sección tapada
    const altoHeader = () =>
        document.querySelector<HTMLElement>("[data-header]")?.offsetHeight ?? 0;

    // ---------- Abrir: lleva a la primera sección (o a otro destino) ----------
    function abrir(
        destino = hero.offsetTop + hero.offsetHeight - altoHeader(),
        alLlegar?: () => void,
    ) {
        if (animando) return;
        sessionStorage.setItem(CLAVE, "1");
        desactivar();

        if (reducirMovimiento) {
            window.scrollTo({ top: destino, behavior: "instant" });
            alLlegar?.();
            return;
        }

        animando = true;
        ultimoEvento = performance.now();
        iniciarBloqueo();
        raiz.setAttribute("data-animando", ""); // el header no se esconde durante la transición
        hero.classList.add("abriendo");
        animarScroll(destino, () => {
            animando = false;
            terminarBloqueo();
            raiz.removeAttribute("data-animando");
            hero.classList.remove("abriendo");
            alLlegar?.();
        });
    }

    function alRueda(evento: WheelEvent) {
        // ctrlKey = gesto de zoom con dos dedos en el touchpad: no es scroll.
        // Ignoramos también movimientos mínimos (un roce accidental).
        if (evento.ctrlKey || evento.deltaY < 4) return;
        evento.preventDefault();
        abrir();
    }

    function alTocar(evento: TouchEvent) {
        inicioToque = evento.touches[0].clientY;
    }

    function alMoverDedo(evento: TouchEvent) {
        const recorrido = inicioToque - evento.touches[0].clientY; // positivo = desliza hacia arriba
        if (recorrido > 0) evento.preventDefault(); // evita que la página se mueva a medias
        if (recorrido > 24) abrir();
    }

    function alTecla(evento: KeyboardEvent) {
        const enControl = (evento.target as HTMLElement).closest(
            "input, textarea, select, button, a",
        );
        if (!enControl && ["ArrowDown", "PageDown", " "].includes(evento.key)) {
            evento.preventDefault();
            abrir();
        }
    }

    // Si la página se movió por otro medio (barra de scroll, Tab), la portada deja de actuar
    function alScroll() {
        if (!animando && window.scrollY > 10) {
            sessionStorage.setItem(CLAVE, "1");
            desactivar();
        }
    }

    function activar() {
        window.addEventListener("wheel", alRueda, { passive: false });
        window.addEventListener("touchstart", alTocar, { passive: true });
        window.addEventListener("touchmove", alMoverDedo, { passive: false });
        window.addEventListener("keydown", alTecla);
        window.addEventListener("scroll", alScroll, { passive: true });
    }

    function desactivar() {
        window.removeEventListener("wheel", alRueda);
        window.removeEventListener("touchstart", alTocar);
        window.removeEventListener("touchmove", alMoverDedo);
        window.removeEventListener("keydown", alTecla);
        window.removeEventListener("scroll", alScroll);
    }

    // La portada solo actúa en la primera entrada, arriba de todo y sin "reducir movimiento"
    if (!reducirMovimiento && !yaVista && !entraConAncla && window.scrollY < 10)
        activar();

    // ---------- "Deslizá para descubrir" ----------
    hero
        .querySelector("[data-descubrir]")
        ?.addEventListener("click", () => abrir());

    // ---------- Enlaces a secciones del inicio (#posventa, #contacto…) ----------
    // Usan la misma transición, desde el header, el menú mobile o el footer.
    document.addEventListener("click", (evento) => {
        const enlace = (evento.target as HTMLElement).closest<HTMLAnchorElement>(
            'a[href^="/#"], a[href^="#"]',
        );
        if (!enlace) return;
        const id = enlace.hash.slice(1);
        const seccion = document.getElementById(id);
        if (!seccion || seccion.tagName !== "SECTION") return; // por ejemplo, "Saltar al contenido" sigue normal

        evento.preventDefault();
        const margen = parseFloat(getComputedStyle(seccion).scrollMarginTop) || 0;
        const destino =
            seccion.getBoundingClientRect().top + window.scrollY - margen;

        abrir(destino, () => {
            window.history.replaceState(null, "", `#${id}`);
            // Llevamos el foco a la sección, para que teclado y lector de pantalla sigan desde ahí
            seccion.setAttribute("tabindex", "-1");
            seccion.focus({ preventScroll: true });
        });
    });
}
