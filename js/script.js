/**
 * PERSONAL PORTFOLIO - JAVASCRIPT CONTROLLER
 * SITE 1101: Principles of Information Systems
 * Modular vanilla JavaScript for Navigation, Theme Toggle, and Gamified DevQuest Engine
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Theme Management (Dark / Light Mode)
     ========================================================================== */
  const THEME_STORAGE_KEY = 'site_portfolio_theme';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeToggleUI(initialTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
        updateThemeToggleUI(newTheme);
        playBeep(440, 0.05); // Subtle tactile audio feedback
      });
    }
  }

  function updateThemeToggleUI(theme) {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    if (theme === 'light') {
      toggleBtn.setAttribute('title', 'Switch to Dark Mode');
      toggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    } else {
      toggleBtn.setAttribute('title', 'Switch to Light Mode');
      toggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      `;
    }
  }

  /* ==========================================================================
     2. Responsive Navigation & Active Link Highlight
     ========================================================================== */
  function initNavigation() {
    const navToggle = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !navToggle.contains(e.target) && mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('open')) {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Set active link according to current location path
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /* ==========================================================================
     3. Web Audio API Synthesizer (Zero-Dependency Sound Effects)
     ========================================================================== */
  let audioCtx = null;
  let soundEnabled = true;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playBeep(freq = 520, duration = 0.08, type = 'sine') {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (err) {
      // Audio not supported or blocked by browser policy
    }
  }

  function playFanfare() {
    if (!soundEnabled) return;
    const notes = [440, 554, 659, 880];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        playBeep(freq, 0.15, 'triangle');
      }, index * 120);
    });
  }

  /* ==========================================================================
     4. Gamified DevQuest & Skill Matrix Engine (Bonus +10 pts)
     ========================================================================== */
  const GAME_STORAGE_KEY = 'site_gamified_stats_v1';

  // Core Skill Tree Data
  const SKILL_NODES = [
    {
      id: 'sys_core',
      name: 'Information Systems Architecture',
      category: 'Core Curriculum',
      level: 4,
      maxLevel: 5,
      xp: 320,
      badge: 'SITE 1101',
      description: 'Foundations of enterprise systems, SDLC models, business processes, and information management hierarchies.',
      technologies: ['Systems Analysis', 'BPMN', 'Requirements Engineering', 'Feasibility']
    },
    {
      id: 'web_frontend',
      name: 'Modern Web Engineering',
      category: 'Development',
      level: 5,
      maxLevel: 5,
      xp: 400,
      badge: 'Mastered',
      description: 'Semantic HTML5 structure, responsive CSS3 layouts, modular vanilla ES6+ architecture, and web accessibility standards.',
      technologies: ['HTML5', 'CSS3 Grid/Flexbox', 'JavaScript ES6+', 'WCAG AA']
    },
    {
      id: 'robotics_embed',
      name: 'Robotics & Hardware Integration',
      category: 'Engineering',
      level: 3,
      maxLevel: 5,
      xp: 260,
      badge: 'Project 3',
      description: 'Embedded system prototyping, sensor telemetry (sonar/IR), microcontrollers, and motor actuation logic.',
      technologies: ['Microcontrollers', 'Sensor Fusion', 'Actuators', 'C/C++ basics']
    },
    {
      id: 'git_devops',
      name: 'Git Version Control & Deployment',
      category: 'Tooling',
      level: 5,
      maxLevel: 5,
      xp: 350,
      badge: 'Certified',
      description: 'Branch management, frequent atomic commits (git add/commit/push), and automated GitHub Pages static hosting.',
      technologies: ['git', 'GitHub Pages', 'Markdown', 'CI/CD Workflow']
    },
    {
      id: 'stem_mentorship',
      name: 'Hour of Code & Tech Mentorship',
      category: 'Community',
      level: 4,
      maxLevel: 5,
      xp: 280,
      badge: 'Project 2',
      description: 'Pedagogical communication, computational thinking workshops, and fostering tech literacy in young learners.',
      technologies: ['Block Coding', 'Mentoring', 'Algorithmic Thinking', 'Public Speaking']
    },
    {
      id: 'database_arch',
      name: 'Relational Database Architecture',
      category: 'Systems & Data',
      level: 3,
      maxLevel: 5,
      xp: 220,
      badge: 'Project 4',
      description: 'Relational schema normalization, SQL entity modeling, data integrity constraints, and query analysis.',
      technologies: ['SQL', 'ER Diagrams', 'Normalization', 'Data Management']
    }
  ];

  // Core Quests Data
  const QUESTS_DATA = [
    {
      id: 'q1',
      title: 'Quest 1: Academic Genesis & Foundation',
      desc: 'Enroll in SITE 1101: Principles of Information Systems and master computing fundamentals.',
      xpReward: 200,
      status: 'completed',
      tag: 'ACADEMIC'
    },
    {
      id: 'q2',
      title: 'Quest 2: Hour of Code Community Crusade',
      desc: 'Conduct community programming sessions to introduce students to computational logic.',
      xpReward: 250,
      status: 'completed',
      tag: 'COMMUNITY'
    },
    {
      id: 'q3',
      title: 'Quest 3: Autonomous Robotics Prototype',
      desc: 'Design, wire, and calibrate an intelligent obstacle-navigating rover prototype.',
      xpReward: 300,
      status: 'completed',
      tag: 'HARDWARE'
    },
    {
      id: 'q4',
      title: 'Quest 4: Personal Static Portfolio Deployment',
      desc: 'Build clean HTML/CSS/JS architecture and launch on GitHub Pages with multiple commits.',
      xpReward: 350,
      status: 'claimable',
      tag: 'WEB ENGINE'
    }
  ];

  function getSavedGameState() {
    try {
      const saved = localStorage.getItem(GAME_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Game state could not be loaded from storage', e);
    }
    return {
      totalXp: 1050,
      level: 3,
      completedQuests: ['q1', 'q2', 'q3'],
      masteredSkills: ['web_frontend', 'git_devops']
    };
  }

  function saveGameState(state) {
    try {
      localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save game state', e);
    }
  }

  function initGamifiedDashboard() {
    const dashboard = document.getElementById('gamified-dashboard');
    if (!dashboard) return;

    let gameState = getSavedGameState();

    // Render stats & UI
    renderGamifiedHUD(gameState);
    renderSkillTree(gameState);
    renderQuestLog(gameState);
    setupGamifiedControls(gameState);
  }

  function renderGamifiedHUD(state) {
    const levelEl = document.getElementById('player-level-badge');
    const xpCurrentEl = document.getElementById('xp-current');
    const xpMaxEl = document.getElementById('xp-max');
    const xpFillEl = document.getElementById('xp-fill');

    const nextLevelTarget = state.level * 500;
    const progressInLevel = state.totalXp % 500;
    const pct = Math.min(100, Math.round((progressInLevel / 500) * 100));

    if (levelEl) levelEl.textContent = `LEVEL ${state.level}`;
    if (xpCurrentEl) xpCurrentEl.textContent = `${state.totalXp} XP`;
    if (xpMaxEl) xpMaxEl.textContent = `${nextLevelTarget} XP Next Level`;
    if (xpFillEl) xpFillEl.style.width = `${pct}%`;
  }

  function renderSkillTree(state) {
    const treeGrid = document.getElementById('skill-tree-grid');
    if (!treeGrid) return;

    treeGrid.innerHTML = '';
    SKILL_NODES.forEach((node) => {
      const isMastered = state.masteredSkills.includes(node.id);
      const card = document.createElement('div');
      card.className = `skill-node-card ${isMastered ? 'mastered' : 'unlocked'}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Inspect ${node.name}`);

      const fillPct = isMastered ? 100 : Math.round((node.level / node.maxLevel) * 100);

      card.innerHTML = `
        <div class="node-header">
          <span class="badge ${isMastered ? 'badge-success' : 'badge-primary'}">${node.badge}</span>
          <span class="node-meta">${isMastered ? 'LVL MAX' : `LVL ${node.level}/${node.maxLevel}`}</span>
        </div>
        <h4 class="node-title">${node.name}</h4>
        <div class="node-meta">${node.category} &bull; +${node.xp} XP</div>
        <div class="node-progress-bar">
          <div class="node-progress-fill" style="width: ${fillPct}%; ${isMastered ? 'background: var(--color-success);' : ''}"></div>
        </div>
      `;

      card.addEventListener('click', () => openSkillModal(node, state));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openSkillModal(node, state);
        }
      });

      treeGrid.appendChild(card);
    });
  }

  function renderQuestLog(state) {
    const questList = document.getElementById('quest-log-list');
    if (!questList) return;

    questList.innerHTML = '';
    QUESTS_DATA.forEach((quest) => {
      const isCompleted = state.completedQuests.includes(quest.id);
      const item = document.createElement('div');
      item.className = `quest-item ${isCompleted ? 'completed' : 'in-progress'}`;

      const iconSvg = isCompleted
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

      item.innerHTML = `
        <div class="quest-icon">${iconSvg}</div>
        <div class="quest-content">
          <h4>${quest.title}</h4>
          <p class="quest-desc">${quest.desc}</p>
        </div>
        <div class="quest-actions" style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="quest-reward-tag">+${quest.xpReward} XP</span>
          ${
            isCompleted
              ? `<span class="badge badge-success">CLEARED</span>`
              : `<button class="btn btn-sm btn-primary claim-quest-btn" data-id="${quest.id}">Claim Quest</button>`
          }
        </div>
      `;

      questList.appendChild(item);
    });

    // Attach claim listeners
    const claimBtns = questList.querySelectorAll('.claim-quest-btn');
    claimBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qId = btn.getAttribute('data-id');
        const quest = QUESTS_DATA.find((q) => q.id === qId);
        if (quest && !state.completedQuests.includes(qId)) {
          state.completedQuests.push(qId);
          awardXP(quest.xpReward, state, `Quest Complete: ${quest.title}`);
          renderQuestLog(state);
        }
      });
    });
  }

  function setupGamifiedControls(state) {
    // Tab Switching: Skill Tree vs Quest Log
    const tabBtns = document.querySelectorAll('.game-tab-btn');
    const skillTreeSection = document.getElementById('skill-tree-view');
    const questLogSection = document.getElementById('quest-log-view');

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        tabBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        playBeep(600, 0.05);

        const target = btn.getAttribute('data-tab');
        if (target === 'skills') {
          if (skillTreeSection) skillTreeSection.style.display = 'block';
          if (questLogSection) questLogSection.style.display = 'none';
        } else {
          if (skillTreeSection) skillTreeSection.style.display = 'none';
          if (questLogSection) questLogSection.style.display = 'block';
        }
      });
    });

    // Sound Toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundBtn.setAttribute('title', soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX');
        soundBtn.textContent = soundEnabled ? '🔊 Sound: On' : '🔇 Sound: Off';
        if (soundEnabled) playBeep(580, 0.06);
      });
    }

    // Reset Progress & Unlock All Testing buttons (for graders)
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        localStorage.removeItem(GAME_STORAGE_KEY);
        location.reload();
      });
    }

    const unlockAllBtn = document.getElementById('unlock-all-btn');
    if (unlockAllBtn) {
      unlockAllBtn.addEventListener('click', () => {
        state.completedQuests = ['q1', 'q2', 'q3', 'q4'];
        state.masteredSkills = SKILL_NODES.map((n) => n.id);
        awardXP(800, state, 'All Specializations & Quests Unlocked!');
        renderSkillTree(state);
        renderQuestLog(state);
      });
    }
  }

  function awardXP(amount, state, reason) {
    state.totalXp += amount;
    const calculatedLevel = Math.max(1, Math.floor(state.totalXp / 500) + 1);

    const leveledUp = calculatedLevel > state.level;
    state.level = calculatedLevel;
    saveGameState(state);
    renderGamifiedHUD(state);

    if (leveledUp) {
      triggerConfetti();
      playFanfare();
      showToast(`⭐ LEVEL UP! You reached Level ${state.level}! (${reason})`);
    } else {
      playBeep(650, 0.1);
      showToast(`✨ +${amount} XP Earned! ${reason}`);
    }
  }

  /* Modal Inspector */
  function openSkillModal(node, state) {
    const modalBackdrop = document.getElementById('inspector-modal-backdrop');
    const modalBody = document.getElementById('inspector-modal-body');
    if (!modalBackdrop || !modalBody) return;

    playBeep(480, 0.06);
    const isMastered = state.masteredSkills.includes(node.id);

    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
        <div>
          <span class="badge ${isMastered ? 'badge-success' : 'badge-primary'}">${node.category}</span>
          <h3 style="margin-top: 0.5rem; font-size: 1.4rem;">${node.name}</h3>
        </div>
        <span class="quest-reward-tag">${isMastered ? 'Mastered' : `Level ${node.level}/${node.maxLevel}`}</span>
      </div>
      <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">${node.description}</p>
      
      <div style="margin-bottom: 1.5rem;">
        <h5 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-main); margin-bottom: 0.5rem;">Competencies & Tools</h5>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${node.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        ${
          !isMastered
            ? `<button id="upgrade-skill-btn" class="btn btn-primary btn-sm">⭐ Master Skill (+150 XP)</button>`
            : `<button class="btn btn-secondary btn-sm" disabled style="opacity: 0.7;">✓ Skill Already Mastered</button>`
        }
      </div>
    `;

    modalBackdrop.classList.add('active');

    const upgradeBtn = document.getElementById('upgrade-skill-btn');
    if (upgradeBtn) {
      upgradeBtn.addEventListener('click', () => {
        if (!state.masteredSkills.includes(node.id)) {
          state.masteredSkills.push(node.id);
          awardXP(150, state, `Skill Mastered: ${node.name}`);
          renderSkillTree(state);
          modalBackdrop.classList.remove('active');
        }
      });
    }

    // Modal Close logic
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => modalBackdrop.classList.remove('active');
    }
    modalBackdrop.onclick = (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
    };
  }

  /* Toast Notification */
  function showToast(message) {
    let toast = document.getElementById('xp-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'xp-toast';
      toast.className = 'xp-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="xp-toast-icon">⚡</div>
      <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-main);">${message}</div>
    `;
    toast.classList.add('visible');

    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3500);
  }

  /* Lightweight Pure Canvas Confetti */
  function triggerConfetti() {
    let canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#38bdf8', '#818cf8', '#f59e0b', '#10b981', '#ec4899'];

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let animationFrame;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rSpeed;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          activeCount++;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (activeCount > 0) {
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    render();
  }

  /* ==========================================================================
     5. Project Filtering (Projects Page)
     ========================================================================== */
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        playBeep(520, 0.04);

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  /* ==========================================================================
     6. Application Lifecycle
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initGamifiedDashboard();
    initProjectFilters();
  });
})();
