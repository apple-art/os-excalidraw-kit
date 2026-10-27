(() => {
  'use strict';
  if (!window.rough || !window.ResizeObserver) return;

  const selector = '.hero-board, .specimen, .hero-actions .button, .filters button, .search-field, .card, .card-actions button, .step-number, .detail-copy-actions .button, .icon-button, .grid-toggle, .nav-button';
  const observed = new Set();
  const pending = new Set();
  let frame = 0;
  let nextSeed = 101;
  const ns = 'http://www.w3.org/2000/svg';

  function draw(el) {
    if (!el.isConnected) return;
    const width = el.clientWidth;
    const height = el.clientHeight;
    if (width < 12 || height < 12) return;
    let svg = el.querySelector(':scope > .sketch-outline');
    if (!svg) {
      svg = document.createElementNS(ns, 'svg');
      svg.classList.add('sketch-outline');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      el.append(svg);
    }
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.replaceChildren();
    const rc = rough.svg(svg);
    const isCard = el.classList.contains('card');
    const isBoard = el.classList.contains('hero-board');
    const isSmall = el.matches('button, .step-number');
    const stroke = el.matches('.button-primary') ? '#30303a' : (isCard ? '#777982' : '#454550');
    const inset = isSmall ? 2.6 : 3.4;
    svg.append(rc.rectangle(inset, inset, width - inset * 2, height - inset * 2, {
      seed: Number(el.dataset.sketchSeed), stroke, strokeWidth: isBoard ? 1.7 : (isCard ? 1.25 : 1.35),
      roughness: isBoard ? 1.8 : 1.65, bowing: 1.25, fill: 'none'
    }));
    el.classList.add('sketched');
  }
  function schedule(el) {
    pending.add(el);
    if (!frame) frame = requestAnimationFrame(() => {
      frame = 0;
      pending.forEach(draw);
      pending.clear();
    });
  }
  const resize = new ResizeObserver(entries => entries.forEach(entry => schedule(entry.target)));
  function add(el) {
    if (observed.has(el)) return;
    observed.add(el);
    el.dataset.sketchSeed = String(nextSeed++);
    resize.observe(el);
    schedule(el);
  }
  function scan(root) {
    if (root.nodeType !== 1) return;
    if (root.matches(selector)) add(root);
    root.querySelectorAll(selector).forEach(add);
  }
  scan(document.body);
  const catalog = document.getElementById('catalog');
  if (catalog) new MutationObserver(records => {
    records.forEach(record => {
      record.removedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        const removed = [node, ...node.querySelectorAll(selector)];
        removed.forEach(el => {
          if (observed.has(el) && !el.isConnected) {
            resize.unobserve(el);
            observed.delete(el);
            pending.delete(el);
          }
        });
      });
      record.addedNodes.forEach(scan);
    });
  }).observe(catalog, {childList: true, subtree: true});
})();
