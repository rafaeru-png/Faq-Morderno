document.addEventListener('DOMContentLoaded', function() {
    // Carrega os dados do FAQ
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            renderFaq(data.faq);
            setupEventListeners();
        })
        .catch(error => console.error('Erro ao carregar FAQ:', error));

    // Função para renderizar os itens do FAQ
    function renderFaq(faqItems) {
        const faqContainer = document.getElementById('faqContainer');
        faqContainer.innerHTML = '';

        faqItems.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = `faq-item ${item.category}`;
            faqItem.innerHTML = `
                <div class="faq-question">
                    <span>${item.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            `;
            faqContainer.appendChild(faqItem);
        });
    }

    // Configura os eventos
    function setupEventListeners() {
        // Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('active');
            });
        });

        // Filtro por categoria
        document.querySelectorAll('.faq-categories button').forEach(button => {
            button.addEventListener('click', () => {
                // Atualiza botão ativo
                document.querySelectorAll('.faq-categories button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');

                // Filtra itens
                const category = button.dataset.category;
                const allItems = document.querySelectorAll('.faq-item');

                allItems.forEach(item => {
                    if (category === 'all' || item.classList.contains(category)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Busca
        const searchInput = document.querySelector('.search-box input');
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.faq-item');

            items.forEach(item => {
                const question = item.querySelector('.faq-question span').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
                
                if (question.includes(term) || answer.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});