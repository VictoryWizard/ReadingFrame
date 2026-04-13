(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelectorAll('.nav-links a');

  function closeNav() {
    if (nav) {
      nav.classList.remove('nav-open');
    }
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.addEventListener('click', function (e) {
    if (nav && nav.classList.contains('nav-open') && !nav.contains(e.target)) {
      closeNav();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('nav-open')) {
      closeNav();
    }
  });

  var currentPage = window.location.pathname;
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (currentPage === href || (currentPage === '/' && href === '/index.html')) {
      link.classList.add('active');
    } else if (currentPage !== '/' && currentPage !== '/index.html' && currentPage.startsWith(href.replace('/index.html', ''))) {
      link.classList.add('active');
    }
  });

  var fadeElements = document.querySelectorAll('.fade-in');
  if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    fadeElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  if (document.body.classList.contains('post-page')) {
    var progressBar = document.getElementById('reading-progress');
    var postContent = document.getElementById('post-content');

    if (progressBar && postContent) {
      window.addEventListener('scroll', function () {
        var rect = postContent.getBoundingClientRect();
        var contentHeight = rect.height;
        var contentTop = rect.top;
        var viewportHeight = window.innerHeight;
        var scrolledPast = viewportHeight - contentTop;
        var progress = Math.min(Math.max(scrolledPast / (contentHeight + viewportHeight * 0.3), 0), 1);
        progressBar.style.width = (progress * 100) + '%';
      }, { passive: true });
    }
  }
})();

// Smooth-scroll TOC links with offset for fixed nav
document.querySelectorAll('.post-toc a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 80;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});