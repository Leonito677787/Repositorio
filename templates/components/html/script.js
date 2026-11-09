document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MENÚ RESPONSIVO
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );
        });

        // Cerrar menú al seleccionar una opción
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
            });
        });
    }


    /* =========================================
       NAVEGACIÓN SUAVE
    ========================================= */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =========================================
       CAMBIO DE ENLACE ACTIVO EN EL MENÚ
    ========================================= */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-link");

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `.nav-link[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            });
        },
        {
            threshold: 0.25
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =========================================
       TIMELINE / HISTORIA
    ========================================= */

    const timelineItems = document.querySelectorAll(".timeline-item");

    timelineItems.forEach(item => {

        const button = item.querySelector(".timeline-button");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // Cerrar todos
            timelineItems.forEach(otherItem => {

                otherItem.classList.remove("active");

                const otherButton =
                    otherItem.querySelector(".timeline-button");

                if (otherButton) {
                    otherButton.setAttribute("aria-expanded", "false");
                }
            });

            // Abrir el seleccionado
            if (!isActive) {
                item.classList.add("active");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });


    /* =========================================
       ARTEFACTOS DEL HERO
    ========================================= */

    const artifacts = [
        {
            year: "1972",
            title: "Los primeros pasos",
            name: "Primeras experiencias comerciales",
            description:
                "El videojuego comienza a convertirse en una experiencia comercial y cultural."
        },
        {
            year: "1983",
            title: "La revolución doméstica",
            name: "Los videojuegos llegan a casa",
            description:
                "Las consolas domésticas comienzan a formar parte de la vida cotidiana."
        },
        {
            year: "1994",
            title: "La era del 3D",
            name: "Una nueva dimensión",
            description:
                "Las nuevas tecnologías gráficas transforman la manera de crear y experimentar videojuegos."
        },
        {
            year: "2000",
            title: "La expansión global",
            name: "El videojuego conectado",
            description:
                "Internet y las nuevas plataformas conectan a jugadores de todo el mundo."
        },
        {
            year: "2020",
            title: "Nuevas formas de jugar",
            name: "El futuro del videojuego",
            description:
                "La industria continúa evolucionando con nuevas tecnologías, plataformas y comunidades."
        }
    ];

    let currentArtifact = 0;

    const artifactYear = document.getElementById("artifactYear");
    const artifactTitle = document.getElementById("artifactTitle");
    const artifactName = document.getElementById("artifactName");
    const artifactDescription =
        document.getElementById("artifactDescription");
    const artifactCounter =
        document.getElementById("artifactCounter");

    const previousButton =
        document.getElementById("previousArtifact");

    const nextButton =
        document.getElementById("nextArtifact");

    const orbitNodes =
        document.querySelectorAll(".orbit-node");


    function updateArtifact(index) {

        if (!artifacts[index]) {
            return;
        }

        const artifact = artifacts[index];

        if (artifactYear) {
            artifactYear.textContent = artifact.year;
        }

        if (artifactTitle) {
            artifactTitle.textContent = artifact.title;
        }

        if (artifactName) {
            artifactName.textContent = artifact.name;
        }

        if (artifactDescription) {
            artifactDescription.textContent =
                artifact.description;
        }

        if (artifactCounter) {
            artifactCounter.textContent =
                `${String(index + 1).padStart(2, "0")} / ${String(artifacts.length).padStart(2, "0")}`;
        }

        // Activar nodo correspondiente
        orbitNodes.forEach(node => {
            node.classList.remove("active");
        });

        if (orbitNodes[index]) {
            orbitNodes[index].classList.add("active");
        }
    }


    if (previousButton) {

        previousButton.addEventListener("click", () => {

            currentArtifact--;

            if (currentArtifact < 0) {
                currentArtifact = artifacts.length - 1;
            }

            updateArtifact(currentArtifact);
        });
    }


    if (nextButton) {

        nextButton.addEventListener("click", () => {

            currentArtifact++;

            if (currentArtifact >= artifacts.length) {
                currentArtifact = 0;
            }

            updateArtifact(currentArtifact);
        });
    }


    // Botones de los años
    orbitNodes.forEach(node => {

        node.addEventListener("click", () => {

            const era = Number(node.dataset.era);

            if (
                Number.isInteger(era) &&
                era >= 0 &&
                era < artifacts.length
            ) {
                currentArtifact = era;
                updateArtifact(currentArtifact);
            }
        });
    });


    // Estado inicial
    updateArtifact(currentArtifact);


    /* =========================================
       CONTADORES DE ESTADÍSTICAS
    ========================================= */

    const counters = document.querySelectorAll("[data-count]");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;

                if (counter.dataset.animated === "true") {
                    return;
                }

                counter.dataset.animated = "true";

                const target =
                    Number(counter.dataset.count) || 0;

                const prefix =
                    counter.dataset.prefix || "";

                const symbol =
                    counter.dataset.symbol || "";

                if (symbol) {
                    counter.textContent = symbol;
                    return;
                }

                let start = 0;
                const duration = 1500;
                const startTime = performance.now();


                function animateCounter(currentTime) {

                    const elapsed = currentTime - startTime;
                    const progress =
                        Math.min(elapsed / duration, 1);

                    // Suaviza el movimiento
                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    const value =
                        Math.floor(eased * target);

                    counter.textContent =
                        prefix + value.toLocaleString("es-MX");

                    if (progress < 1) {
                        requestAnimationFrame(animateCounter);
                    } else {
                        counter.textContent =
                            prefix +
                            target.toLocaleString("es-MX");
                    }
                }

                requestAnimationFrame(animateCounter);

                counterObserver.unobserve(counter);
            });
        },
        {
            threshold: 0.5
        }
    );


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =========================================
       ANIMACIONES REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================================
       CERRAR MENÚ AL HACER SCROLL
    ========================================= */

    window.addEventListener(
        "scroll",
        () => {

            if (
                navMenu &&
                navMenu.classList.contains("open")
            ) {
                navMenu.classList.remove("open");

                if (menuToggle) {
                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Abrir menú"
                    );
                }
            }
        },
        { passive: true }
    );


    /* =========================================
       BOTONES DE COLECCIÓN
    ========================================= */

    const collectionButton =
        document.querySelector(
            '.collection-copy .button'
        );

    if (collectionButton) {

        collectionButton.addEventListener("click", event => {

            event.preventDefault();

            alert(
                "La función de creación de colecciones estará disponible próximamente."
            );
        });
    }


    /* =========================================
       BOTÓN "ÚNETE AL CAMINO"
    ========================================= */

    const communityButton =
        document.querySelector(
            ".community-action .button"
        );

    if (communityButton) {

        communityButton.addEventListener("click", event => {

            event.preventDefault();

            alert(
                "¡Gracias por tu interés en formar parte de Our Path!"
            );
        });
    }


    /* =========================================
       BOTONES DEL MARKETPLACE
    ========================================= */

    const productLinks =
        document.querySelectorAll(
            ".product-info a"
        );

    productLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const productCard =
                link.closest(".product-card");

            const productName =
                productCard?.querySelector("h3")?.textContent ||
                "este artículo";

            alert(
                `Has seleccionado: ${productName}\n\nLa información detallada del artículo estará disponible próximamente.`
            );
        });
    });


    /* =========================================
       EFECTO DEL HEADER AL HACER SCROLL
    ========================================= */

    const header =
        document.querySelector(".site-header");

    if (header) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 50) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
            },
            { passive: true }
        );
    }


    /* =========================================
       PREVENIR ERRORES POR IMÁGENES
    ========================================= */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("error", () => {

            image.style.opacity = "0.4";
            image.alt = "Imagen no disponible";
        });
    });


    console.log(
        "Our Path | Sistema JavaScript cargado correctamente."
    );

    /* =========================================================
   MODALES — LOGIN / REGISTRO
   SOLO INTERFAZ FRONTAL
   ========================================================= */

    function initAuthModals() {

        const openButtons =
            document.querySelectorAll(
                "[data-modal-open]"
            );

        const closeButtons =
            document.querySelectorAll(
                "[data-modal-close]"
            );

        const modalOverlays =
            document.querySelectorAll(
                ".modal-overlay"
            );


        /* =====================================================
        ABRIR MODAL
        ===================================================== */

            function initAuthModals() {

    const openButtons = document.querySelectorAll("[data-modal-open]");
    const closeButtons = document.querySelectorAll("[data-modal-close]");
    const modalOverlays = document.querySelectorAll(".modal-overlay");

    function openModal(modalId) {

        const modal = document.getElementById(modalId);

        if (!modal) {
            console.warn("No se encontró el modal:", modalId);
            return;
        }

        modalOverlays.forEach(item => {
            item.classList.remove("is-open");
            item.setAttribute("aria-hidden", "true");
        });

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        const firstInput = modal.querySelector("input");

        if (firstInput) {
            firstInput.focus();
        }
    }

    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        const anotherModalOpen = document.querySelector(
            ".modal-overlay.is-open"
        );

        if (!anotherModalOpen) {
            document.body.classList.remove("modal-open");
        }
    }

    // Abrir
    openButtons.forEach(button => {
        button.addEventListener("click", () => {
            openModal(button.dataset.modalOpen);
        });
    });

    // Cerrar
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            closeModal(button.closest(".modal-overlay"));
        });
    });

    // Cerrar al hacer clic fuera
    modalOverlays.forEach(overlay => {
        overlay.addEventListener("click", event => {
            if (event.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // Cambiar entre inicio de sesión y registro
    document.querySelectorAll("[data-switch-modal]").forEach(button => {
        button.addEventListener("click", () => {
            openModal(button.dataset.switchModal);
        });
    });

    // Cerrar con Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            const activeModal = document.querySelector(
                ".modal-overlay.is-open"
            );

            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    // Formularios de demostración
    document.querySelectorAll(".auth-form").forEach(form => {

        form.addEventListener("submit", event => {

            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const button = form.querySelector(".submit-button");

            if (!button) return;

            const original = button.innerHTML;

            button.innerHTML = 'DEMO VISUAL <span>✓</span>';
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = original;
                button.disabled = false;
            }, 1500);

        });

    });

}

// Inicializar autenticación
initAuthModals();


        /* =====================================================
        CERRAR MODAL
        ===================================================== */

        function closeModal(modal) {

            if (!modal) return;


            modal.classList.remove(
                "is-open"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.classList.remove(
                "modal-open"
            );
        }


        /* =====================================================
        BOTONES PARA ABRIR
        ===================================================== */

        openButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const modalId =
                        button.dataset.modalOpen;

                    openModal(modalId);

                }
            );

        });


        /* =====================================================
        BOTONES PARA CERRAR
        ===================================================== */

        closeButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const modal =
                        button.closest(
                            ".modal-overlay"
                        );

                    closeModal(modal);

                }
            );

        });


        /* =====================================================
        CLICK FUERA DE LA VENTANA
        ===================================================== */

        modalOverlays.forEach(overlay => {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target === overlay
                    ) {

                        closeModal(
                            overlay
                        );

                    }

                }
            );

        });


        /* =====================================================
        CAMBIAR ENTRE LOGIN / REGISTRO
        ===================================================== */

        document
            .querySelectorAll(
                "[data-switch-modal]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const targetModal =
                            button.dataset
                                .switchModal;

                        openModal(
                            targetModal
                        );

                    }
                );

            });


        /* =====================================================
        ESC PARA CERRAR
        ===================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Escape"
                ) {
                    return;
                }


                const activeModal =
                    document.querySelector(
                        ".modal-overlay.is-open"
                    );


                if (activeModal) {

                    closeModal(
                        activeModal
                    );

                }

            }
        );


        /* =====================================================
        FORMULARIOS — SOLO DEMOSTRACIÓN
        NO ENVÍA INFORMACIÓN
        ===================================================== */

        document
            .querySelectorAll(
                ".auth-form"
            )
            .forEach(form => {

                form.addEventListener(
                    "submit",
                    event => {

                        event.preventDefault();


                        const button =
                            form.querySelector(
                                ".submit-button"
                            );


                        if (!button) return;


                        const original =
                            button.innerHTML;


                        button.innerHTML =
                            'DEMO VISUAL <span>✓</span>';


                        setTimeout(() => {

                            button.innerHTML =
                                original;

                        }, 1200);

                    }
                );

            });

    }

    // Se ejecuta la inicialización de los modales de autenticación
    initAuthModals();

});