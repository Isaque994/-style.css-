document.addEventListener('DOMContentLoaded', function() {
  // 1. ANIMAÇÃO DE DIGITAÇÃO PARA O TÍTULO
  const heroTitle = document.querySelector('header h1');
  const originalTitle = heroTitle.textContent;
  heroTitle.textContent = '';
  
  let i = 0;
  const typingEffect = setInterval(() => {
    if (i < originalTitle.length) {
      heroTitle.textContent += originalTitle.charAt(i);
      i++;
    } else {
      clearInterval(typingEffect);
    }
  }, 100);

  // 2. EFEITO PARALLAX PARA O HEADER
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const header = document.querySelector('header');
    header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
  });

  // 3. CONTADOR SIMBÓLICO DE TRABALHADORES HOMENAGEADOS
  const counterElement = document.createElement('div');
  counterElement.className = 'counter';
  counterElement.innerHTML = `
    <span class="counter-number">0</span>
    <span class="counter-text">trabalhadores homenageados</span>
  `;
  document.querySelector('.container').prepend(counterElement);

  let count = 0;
  const targetCount = 1284; // Número simbólico
  const counter = setInterval(() => {
    if (count < targetCount) {
      count += 7;
      document.querySelector('.counter-number').textContent = count.toLocaleString();
    } else {
      clearInterval(counter);
    }
  }, 30);

  // 4. GALERIA INTERATIVA DE PROFISSÕES
  const professions = [
    { name: 'Profissionais da Saúde', icon: '🏥', color: '#e63946' },
    { name: 'Professores', icon: '📚', color: '#1d3557' },
    { name: 'Operários', icon: '🏭', color: '#457b9d' },
    { name: 'Agricultores', icon: '🌾', color: '#2a9d8f' },
    { name: 'Comerciários', icon: '🛒', color: '#e9c46a' },
    { name: 'Tecnologia', icon: '💻', color: '#f4a261' }
  ];

  const gallerySection = document.createElement('section');
  gallerySection.innerHTML = `
    <h2>Profissões em Destaque</h2>
    <div class="professions-gallery"></div>
  `;
  document.querySelector('.container').appendChild(gallerySection);

  const gallery = document.querySelector('.professions-gallery');
  professions.forEach(prof => {
    const card = document.createElement('div');
    card.className = 'profession-card';
    card.innerHTML = `
      <div class="profession-icon">${prof.icon}</div>
      <h3>${prof.name}</h3>
    `;
    card.style.backgroundColor = prof.color + '20'; // Adiciona transparência
    card.style.borderTop = `4px solid ${prof.color}`;
    
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    });
    
    gallery.appendChild(card);
  });

  // 5. FORMULÁRIO DE HOMENAGEM
  const tributeForm = document.createElement('section');
  tributeForm.innerHTML = `
    <h2>Deixe sua homenagem</h2>
    <form id="tributeForm">
      <div class="form-group">
        <label for="name">Seu nome:</label>
        <input type="text" id="name" required>
      </div>
      <div class="form-group">
        <label for="profession">Sua profissão:</label>
        <input type="text" id="profession" required>
      </div>
      <div class="form-group">
        <label for="message">Mensagem:</label>
        <textarea id="message" rows="4" required></textarea>
      </div>
      <button type="submit" class="btn-tribute">Enviar Homenagem</button>
    </form>
    <div id="tributesContainer" class="tributes-container"></div>
  `;
  document.querySelector('.container').appendChild(tributeForm);

  document.getElementById('tributeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const profession = document.getElementById('profession').value;
    const message = document.getElementById('message').value;
    
    const tributeElement = document.createElement('div');
    tributeElement.className = 'tribute-card';
    tributeElement.innerHTML = `
      <h3>${name} <span>${profession}</span></h3>
      <p>${message}</p>
      <div class="tribute-date">${new Date().toLocaleDateString()}</div>
    `;
    
    document.getElementById('tributesContainer').prepend(tributeElement);
    
    // Animação
    tributeElement.style.opacity = '0';
    tributeElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
      tributeElement.style.transition = 'all 0.5s ease';
      tributeElement.style.opacity = '1';
      tributeElement.style.transform = 'translateY(0)';
    }, 100);
    
    // Limpar formulário
    this.reset();
    
    // Atualizar contador
    count++;
    document.querySelector('.counter-number').textContent = count.toLocaleString();
  });

  // 6. EFEITO DE CONFETTI AO FINAL DA PÁGINA
  const footer = document.querySelector('footer');
  footer.addEventListener('mouseenter', () => {
    createConfetti();
  });

  function createConfetti() {
    const colors = ['#e63946', '#1d3557', '#a8dadc', '#f1faee', '#ffd166'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  }
});

// Adicionando estilos dinâmicos para os novos elementos
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  /* Estilos para o contador */
  .counter {
    text-align: center;
    margin: 2rem 0;
    padding: 1.5rem;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .counter-number {
    font-size: 3rem;
    font-weight: bold;
    color: var(--primary-color);
    display: block;
  }
  
  .counter-text {
    font-size: 1.2rem;
    color: var(--secondary-color);
  }
  
  /* Galeria de profissões */
  .professions-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .profession-card {
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .profession-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .profession-card h3 {
    color: var(--secondary-color);
  }
  
  /* Formulário de homenagem */
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: var(--secondary-color);
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-family: inherit;
  }
  
  .form-group textarea {
    resize: vertical;
  }
  
  /* Cartões de homenagem */
  .tribute-card {
    background: white;
    padding: 1.5rem;
    margin: 1rem 0;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    border-left: 4px solid var(--primary-color);
  }
  
  .tribute-card h3 span {
    font-size: 0.9em;
    color: var(--secondary-color);
    font-weight: normal;
  }
  
  .tribute-date {
    font-size: 0.8em;
    color: #666;
    text-align: right;
    margin-top: 0.5rem;
  }
  
  /* Confetti */
  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    top: -10px;
    z-index: 9999;
    opacity: 0.8;
  }
  
  @keyframes fall {
    to {
      top: 100vh;
      transform: rotate(360deg);
    }
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .professions-gallery {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    
    .counter-number {
      font-size: 2rem;
    }
  }
`;
document.head.appendChild(dynamicStyles);
