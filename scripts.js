document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const headerHeight = document.querySelector('header').offsetHeight;
        const targetId = this.getAttribute('href').substr(1); // Get the id without '#'
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > header.offsetHeight) {
        header.style.opacity = 0.9;
    } else {
        header.style.opacity = 1;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Função para remover a classe ativa de todas as seções
    function removeActiveClasses() {
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Função para adicionar a classe ativa à seção visível
    function addActiveClass() {
        let index = sections.length;

        while(--index && window.scrollY + document.querySelector('header').offsetHeight < sections[index].offsetTop) {}

        removeActiveClasses();
        sections[index].classList.add('active');
        navLinks[index].classList.add('active');
    }

    addActiveClass();
    window.addEventListener('scroll', addActiveClass);

    // Adicionar comportamento para clique nos links do menu
    navLinks.forEach((link, idx) => {
        link.addEventListener('click', function() {
            e.preventDefault();
            removeActiveClasses();
            sections[idx].classList.add('active');
            //navLinks[idx].classList.add('active');
            this.classList.add('active');

            // Calculate scroll position
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetId = this.getAttribute('href').substr(1); // Get the id without '#'
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

        });
    });
});
