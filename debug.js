document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada');
    
    // Verificar se a seção de habilidades existe
    const skillsSection = document.getElementById('skills');
    console.log('Seção de habilidades encontrada:', skillsSection);
    
    if (skillsSection) {
        console.log('Estilos da seção de habilidades:', window.getComputedStyle(skillsSection));
        
        // Forçar a exibição da seção
        skillsSection.style.display = 'block';
        skillsSection.style.visibility = 'visible';
        skillsSection.style.opacity = '1';
        
        // Adicionar uma borda vermelha para destacar a seção
        skillsSection.style.border = '2px solid red';
        
        // Rolar até a seção para garantir que está visível
        setTimeout(() => {
            skillsSection.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    } else {
        console.error('Seção de habilidades não encontrada!');
    }
    
    // Verificar se há erros de carregamento de estilos
    const styleSheets = document.styleSheets;
    console.log('Folhas de estilo carregadas:', styleSheets.length);
    
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            console.log(`Estilo ${i}:`, styleSheets[i].href || 'Estilo inline');
        } catch (e) {
            console.error(`Erro ao acessar folha de estilo ${i}:`, e);
        }
    }
});
