/* ══════════════════════════════════════════════
   TERMINAL PORTFOLIO — Francesco De Patre
   main.js  —  data-driven rendering
   ══════════════════════════════════════════════ */

/* ── Helpers ── */
function el(id)        { return document.getElementById(id); }
function esc(str)      { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function setHTML(id, h){ var e = el(id); if (e) e.innerHTML = h; }
function setAttr(id, attr, val){ var e = el(id); if (e) e.setAttribute(attr, val); }

/* ── Build boot screen ── */
function renderBoot(lines) {
  var screen = el('boot-screen');
  if (!screen) return;
  lines.forEach(function(line, i) {
    var div = document.createElement('div');
    div.className = 'boot-line';
    div.id = 'b' + i;
    div.innerHTML = line.text;
    if (line.color) div.style.color = line.color;
    screen.appendChild(div);
  });

  var delays = [200, 500, 850, 1150, 1400, 1700, 2000, 2400];
  lines.forEach(function(_, i) {
    setTimeout(function() {
      var e = el('b' + i);
      if (e) e.style.animation = 'boot-appear 0.3s forwards';
    }, delays[i] || (2400 + i * 300));
  });

  setTimeout(function() {
    var bs = el('boot-screen');
    if (!bs) return;
    bs.style.transition = 'opacity 0.6s';
    bs.style.opacity = '0';
    setTimeout(function() { bs.remove(); }, 700);
  }, 3200);
}

/* ── Build <head> meta tags ── */
function renderMeta(meta) {
  document.title = meta.title;

  var desc = document.querySelector('meta[name="description"]');
  if (!desc) { desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc); }
  desc.content = meta.description;

  var theme = document.querySelector('meta[name="theme-color"]');
  if (!theme) { theme = document.createElement('meta'); theme.name = 'theme-color'; document.head.appendChild(theme); }
  theme.content = meta.themeColor;
}

/* ── Build nav logo ── */
function renderLogo(identity) {
  var logo = el('nav-logo');
  if (!logo) return;
  var parts = identity.lastName.toUpperCase().split('');
  logo.innerHTML =
    identity.firstName[0] +
    '<span>.</span>' +
    esc(identity.lastName.toUpperCase()) +
    '<span class="cursor-line"></span>';
}

/* ── Build status bar ── */
function renderStatusBar(identity) {
  setHTML('status-left',
    '● ONLINE &nbsp;|&nbsp; ' + esc(identity.email) +
    ' &nbsp;|&nbsp; ' + esc(identity.location.toUpperCase())
  );
}

/* ── Build intro section ── */
function renderIntro(identity, tags, social) {
  /* prompt line */
  setHTML('intro-prompt',
    '<span class="ps1">fdp@unipr</span>' +
    '<span class="at">:</span>' +
    '<span style="color:#5f5">~/portfolio</span>$ whoami'
  );

  /* name */
  setHTML('intro-name',
    esc(identity.firstName) + '<br>' + esc(identity.lastName) +
    '<span class="cursor"></span>'
  );

  /* description lines */
  setHTML('intro-desc',
    '<span style="color:var(--amber)">// </span>' + esc(identity.role) + '<br>' +
    '<span style="color:var(--amber)">// </span>' + esc(identity.team) + '<br>' +
    '<span style="color:var(--amber)">// </span>' + esc(identity.focus)
  );

  /* tags */
  setHTML('intro-tags',
    tags.map(function(t) {
      return '<span class="tag">' + esc(t) + '</span>';
    }).join('')
  );

  /* social links */
  setHTML('intro-social',
    social.map(function(s) {
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">[' + esc(s.label) + ']</a></li>';
    }).join('')
  );
}

/* ── Build about section ── */
function renderAbout(identity, about, skills) {
  /* bio — about text may contain <strong> tags, kept intentionally */
  setHTML('about-bio',
    '<p><span style="color:var(--amber)">$</span> ' + about + '</p>'
  );

  /* skills grid */
  setHTML('skills-grid',
    skills.map(function(s) {
      return '<div class="skill-item">' + esc(s) + '</div>';
    }).join('')
  );
}

/* ── Build timeline block ── */
function renderTimeline(containerId, entries) {
  setHTML(containerId,
    entries.map(function(e) {
      return (
        '<div class="tl-block">' +
          '<div class="tl-time">'  + esc(e.period) + '</div>' +
          '<div class="tl-title">' + esc(e.org)    + '</div>' +
          '<div class="tl-role">'  + esc(e.role)   + '</div>' +
          '<div class="tl-body">'  + esc(e.desc)   + '</div>' +
        '</div>'
      );
    }).join('')
  );
}

/* ── Build works section ── */
function renderWorks(projects) {
  setHTML('works-header',
    '<span style="color:var(--amber)">$</span> ls -la ~/projects/ &nbsp;|&nbsp; ' +
    '<span style="color:var(--green-dim)">' + projects.length + ' items found</span>'
  );

  setHTML('works-grid',
    projects.map(function(p) {
      return (
        '<a class="work-card" href="' + esc(p.url) + '" target="_blank" rel="noopener">' +
          '<div class="work-num">'   + esc(p.num)   + '</div>' +
          '<div class="work-cat">'   + esc(p.cat)   + '</div>' +
          '<div class="work-title">' + esc(p.title) + '</div>' +
          '<div class="work-desc">'  + esc(p.desc)  + '</div>' +
          '<div class="work-link">view source</div>' +
        '</a>'
      );
    }).join('')
  );
}

/* ── Build contact section ── */
function renderContact(identity, social, contact) {
  setHTML('contact-heading',
    esc(contact.heading) + '<span class="cursor-line"></span>'
  );
  setHTML('contact-subtext', esc(contact.subtext));

  var emailEl = el('contact-email');
  if (emailEl) {
    emailEl.href        = 'mailto:' + identity.email;
    emailEl.textContent = identity.email;
  }

  setHTML('contact-social',
    social.map(function(s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + ' / ' + esc(s.url.replace(/https?:\/\//, '')) + '</a>';
    }).join('')
  );

  var cta = el('contact-cta');
  if (cta) {
    cta.href        = 'mailto:' + identity.email;
    cta.textContent = contact.ctaLabel;
  }
}

/* ── Build footer ── */
function renderFooter(footer) {
  setHTML('footer-copyright', esc(footer.copyright));
  setHTML('footer-build',     esc(footer.build));
}

/* ── Live clock ── */
function startClock() {
  function tick() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2,'0');
    var m = String(now.getMinutes()).padStart(2,'0');
    var s = String(now.getSeconds()).padStart(2,'0');
    var e = el('clock');
    if (e) e.textContent = h + ':' + m + ':' + s;
  }
  setInterval(tick, 1000);
  tick();
}

/* ── Session uptime ── */
function startUptime() {
  var t0 = Date.now();
  function tick() {
    var elapsed = Math.floor((Date.now() - t0) / 1000);
    var h = String(Math.floor(elapsed / 3600)).padStart(2,'0');
    var m = String(Math.floor((elapsed % 3600) / 60)).padStart(2,'0');
    var s = String(elapsed % 60).padStart(2,'0');
    var e = el('uptime');
    if (e) e.textContent = h + ':' + m + ':' + s;
  }
  setInterval(tick, 1000);
}

/* ── Mobile menu ── */
function initMenu() {
  var toggle  = el('menuToggle');
  var navList = el('navList');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', function() {
    navList.classList.toggle('open');
  });

  navList.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() {
      navList.classList.remove('open');
    });
  });
}

/* ── Active nav on scroll ── */
function initScrollSpy() {
  var sections = document.querySelectorAll('section[id]');
  var links    = document.querySelectorAll('nav a');

  function update() {
    var current = '';
    sections.forEach(function(s) {
      if (window.scrollY >= s.offsetTop - 80) current = s.id;
    });
    links.forEach(function(a) {
      a.style.color = (a.getAttribute('href') === '#' + current)
        ? 'var(--green)'
        : 'var(--green-dim)';
    });
  }

  window.addEventListener('scroll', update, { passive: true });
}

/* ══════════════════════════════════════════════
   INIT — fetch data.json then render everything
   ══════════════════════════════════════════════ */
fetch('data/data.json')
  .then(function(res) {
    if (!res.ok) throw new Error('Failed to load data.json — HTTP ' + res.status);
    return res.json();
  })
  .then(function(d) {
    renderMeta(d.meta);
    renderBoot(d.boot);
    renderLogo(d.identity);
    renderStatusBar(d.identity);
    renderIntro(d.identity, d.tags, d.social);
    renderAbout(d.identity, d.about, d.skills);
    renderTimeline('timeline-experience', d.experience);
    renderTimeline('timeline-education',  d.education);
    renderWorks(d.projects);
    renderContact(d.identity, d.social, d.contact);
    renderFooter(d.footer);

    startClock();
    startUptime();
    initMenu();
    initScrollSpy();
  })
  .catch(function(err) {
    console.error('[portfolio]', err);
    /* Graceful fallback: show error in boot screen */
    var bs = el('boot-screen');
    if (bs) {
      bs.innerHTML =
        '<div class="boot-line" style="color:#ff5f56; animation: boot-appear 0.3s forwards;">' +
        'ERROR: could not load data/data.json — ' + err.message + '</div>';
    }
  });
