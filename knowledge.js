document.addEventListener('DOMContentLoaded', function() {
    // Função para verificar se o elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Função para animar as barras de progresso
    function animateProgressBars() {
        const knowledgeItems = document.querySelectorAll('.knowledge-item');
        
        knowledgeItems.forEach((item, index) => {
            if (isElementInViewport(item) && !item.classList.contains('animated')) {
                item.classList.add('animated');
                
                // Atraso para animação em cascata
                setTimeout(() => {
                    const progressBar = item.querySelector('.knowledge-progress');
                    const percentElement = item.querySelector('.knowledge-percent');
                    const percent = parseInt(item.getAttribute('data-percent'));
                    
                    // Animar a barra de progresso
                    progressBar.style.width = percent + '%';
                    
                    // Animar o contador de porcentagem
                    let current = 0;
                    const duration = 2000; // 2 segundos
                    const increment = percent / (duration / 16); // 60fps
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= percent) {
                            current = percent;
                            clearInterval(timer);
                        }
                        percentElement.textContent = Math.round(current) + '%';
                    }, 16);
                    
                }, index * 150); // Atraso entre cada item
            }
        });
    }

    // Animar as barras quando a página carregar
    animateProgressBars();
    
    // Animar as barras quando o usuário rolar a página
    window.addEventListener('scroll', animateProgressBars);

    // Adicionar classe de animação para os itens que já estão visíveis
    const knowledgeItems = document.querySelectorAll('.knowledge-item');
    knowledgeItems.forEach((item, index) => {
        if (isElementInViewport(item)) {
            setTimeout(() => {
                item.style.animationDelay = (index * 0.1) + 's';
                item.style.opacity = 1;
            }, 100);
        }
    });
});
