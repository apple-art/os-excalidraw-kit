(() => {
  'use strict';

  const assets = Array.isArray(window.OS_ASSETS) ? window.OS_ASSETS : [];
  const byId = id => document.getElementById(id);
  const search = byId('search');
  const filters = byId('filters');
  const catalog = byId('catalog');
  const empty = byId('empty');
  const count = byId('result-count');
  const detail = byId('detail');
  const toastNode = byId('toast');
  const svgCache = new Map();
  const pngCache = new Map();
  const codeCache = new Map();
  const categoryNames = {system: '基础组件', scheduling: '调度与同步', frequency: '调频与功耗'};
  let category = 'all';
  let visible = [];
  let detailItems = [];
  let detailIndex = 0;
  let returnFocus = null;
  let toastTimer;

  function node(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  function toast(message, error = false) {
    clearTimeout(toastTimer);
    const host = detail.open ? detail : document.body;
    if (toastNode.parentElement !== host) host.append(toastNode);
    toastNode.hidden = false;
    toastNode.dataset.state = error ? 'error' : 'success';
    toastNode.textContent = message;
    toastNode.classList.add('is-visible');
    toastTimer = setTimeout(() => {
      toastNode.classList.remove('is-visible');
      toastNode.hidden = true;
    }, error ? 6500 : 4200);
  }

  function clipboardCode(item, pretty = false) {
    if (pretty) return JSON.stringify({type: 'excalidraw/clipboard', elements: item.elements, files: {}}, null, 2);
    if (!codeCache.has(item.id)) {
      codeCache.set(item.id, JSON.stringify({type: 'excalidraw/clipboard', elements: item.elements, files: {}}));
    }
    return codeCache.get(item.id);
  }

  function cached(cache, key, load) {
    if (!cache.has(key)) {
      const promise = load().catch(error => {cache.delete(key); throw error;});
      cache.set(key, promise);
    }
    return cache.get(key);
  }

  function svgText(item) {
    return cached(svgCache, item.id, async () => {
      const response = await fetch(item.svg);
      if (!response.ok) throw new Error('SVG 文件暂时无法读取');
      return response.text();
    });
  }

  function pngBlob(item) {
    return cached(pngCache, item.id, async () => {
      const response = await fetch(item.png);
      if (!response.ok) throw new Error('PNG 文件暂时无法读取');
      const blob = await response.blob();
      return blob.type === 'image/png' ? blob : new Blob([blob], {type: 'image/png'});
    });
  }

  function prefetch(item) {
    svgText(item).catch(() => {});
    pngBlob(item).catch(() => {});
  }

  function legacyCopy(text) {
    const active = document.activeElement;
    const input = node('textarea');
    input.value = text;
    input.readOnly = true;
    input.tabIndex = -1;
    input.setAttribute('aria-label', '待复制内容');
    Object.assign(input.style, {position: 'fixed', top: '0', left: '-10000px', width: '1px', height: '1px'});
    (detail.open ? detail : document.body).append(input);
    input.focus({preventScroll: true});
    input.select();
    input.setSelectionRange(0, input.value.length);
    let copied = false;
    try {copied = document.execCommand('copy');} finally {
      input.remove();
      if (active && active.isConnected) active.focus({preventScroll: true});
    }
    if (!copied) throw new Error('浏览器未允许复制');
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {await navigator.clipboard.writeText(text); return;} catch (_) {/* Try the user-initiated text fallback. */}
    }
    legacyCopy(text);
  }

  function supportsImage(type) {
    if (!window.ClipboardItem || !navigator.clipboard || !navigator.clipboard.write) return false;
    if (typeof ClipboardItem.supports === 'function') {
      try {return ClipboardItem.supports(type);} catch (_) {return false;}
    }
    return type === 'image/png';
  }

  async function copy(item, format, button) {
    if (button.disabled) return;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    try {
      if (format === 'native') {
        await copyText(clipboardCode(item));
        toast('已复制「' + item.title + '」· 到 Excalidraw 画布粘贴即可编辑');
      } else if (format === 'png') {
        if (!supportsImage('image/png')) {
          throw new Error('此浏览器不支持复制 PNG，请打开预览并下载 PNG');
        }
        // Call write during the click's user activation; the image may resolve later.
        const image = pngBlob(item);
        await navigator.clipboard.write([new ClipboardItem({'image/png': image})]);
        toast('已复制「' + item.title + '」的 PNG 图像');
      } else {
        const text = svgText(item);
        if (supportsImage('image/svg+xml')) {
          try {
            await navigator.clipboard.write([new ClipboardItem({
              'image/svg+xml': text.then(value => new Blob([value], {type: 'image/svg+xml'})),
              'text/plain': text.then(value => new Blob([value], {type: 'text/plain'}))
            })]);
            toast('已复制「' + item.title + '」的 SVG 图像与源码');
            return;
          } catch (_) {/* If the image write is rejected, still try copying the source. */}
        }
        if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
          try {
            // Resolve the source inside ClipboardItem to preserve first-tap activation.
            await navigator.clipboard.write([new ClipboardItem({
              'text/plain': text.then(value => new Blob([value], {type: 'text/plain'}))
            })]);
            toast('已复制「' + item.title + '」的 SVG 源码');
            return;
          } catch (_) {/* The text-only fallback below reports a real failure if denied. */}
        }
        await copyText(await text);
        toast('已复制「' + item.title + '」的 SVG 源码');
      }
    } catch (error) {
      const denied = error && (error.name === 'NotAllowedError' || error.name === 'SecurityError');
      toast(denied ? '浏览器未允许复制，可打开预览下载对应格式。' : (error.message || '复制失败，可打开预览下载文件。'), true);
    } finally {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  }

  function makeCopyButton(item, format, label, className) {
    const button = node('button', className, label);
    button.type = 'button';
    const formatName = format === 'native' ? 'Excalidraw 图元' : format.toUpperCase();
    button.setAttribute('aria-label', '复制「' + item.title + '」的 ' + formatName);
    button.title = format === 'native' ? '复制后直接粘贴到 Excalidraw 画布' : '复制 ' + formatName;
    button.addEventListener('click', () => copy(item, format, button));
    return button;
  }

  function card(item, index) {
    const article = node('article', 'card');
    article.dataset.id = item.id;
    const preview = node('button', 'card-preview');
    preview.type = 'button';
    preview.setAttribute('aria-label', '放大预览「' + item.title + '」');
    const image = node('img', 'card-image');
    image.src = item.svg;
    image.alt = item.title;
    image.loading = index < 6 ? 'eager' : 'lazy';
    image.decoding = 'async';
    preview.append(image, node('span', 'preview-label', '放大 ↗'));
    preview.addEventListener('click', () => openDetail(item, preview));
    const content = node('div', 'card-content');
    const heading = node('h3', 'card-title', item.title);
    const tags = node('div', 'card-tags');
    (item.tags || []).slice(0, 3).forEach(tag => tags.append(node('span', '', tag)));
    const actions = node('div', 'card-actions');
    actions.append(
      makeCopyButton(item, 'native', '复制 Excalidraw', 'copy-native'),
      makeCopyButton(item, 'svg', 'SVG', 'copy-svg'),
      makeCopyButton(item, 'png', 'PNG', 'copy-png')
    );
    content.append(heading, tags, actions);
    article.append(preview, content);
    article.addEventListener('pointerenter', () => prefetch(item), {once: true});
    article.addEventListener('focusin', () => prefetch(item), {once: true});
    return article;
  }

  function render() {
    const terms = search.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    visible = assets.filter(item => {
      if (category !== 'all' && category !== item.category) return false;
      const haystack = [item.id, item.title, item.description, categoryNames[item.category] || '', ...(item.tags || [])].join(' ').toLocaleLowerCase();
      return terms.every(term => haystack.includes(term));
    });
    catalog.replaceChildren(...visible.map(card));
    empty.hidden = visible.length !== 0;
    count.textContent = '找到 ' + visible.length + ' / ' + assets.length + ' 个组件';
    for (const button of filters.querySelectorAll('[data-filter]')) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === category));
    }
  }

  function setDownload(id, file, item) {
    const link = byId(id);
    link.href = file;
    link.download = item.id + '.' + (id === 'download-native' ? 'excalidraw' : id === 'download-svg' ? 'svg' : 'png');
  }

  function showDetail(index) {
    if (!detailItems.length) return;
    detailIndex = Math.max(0, Math.min(index, detailItems.length - 1));
    const item = detailItems[detailIndex];
    byId('detail-title').textContent = item.title;
    byId('detail-image').src = item.svg;
    byId('detail-image').alt = item.title;
    byId('detail-description').textContent = item.description || '原生 Excalidraw 组件，可逐个修改图元。';
    byId('detail-tags').replaceChildren(...(item.tags || []).map(tag => node('span', '', tag)));
    byId('detail-counter').textContent = (detailIndex + 1) + ' / ' + detailItems.length;
    byId('detail-prev').disabled = detailIndex === 0;
    byId('detail-next').disabled = detailIndex === detailItems.length - 1;
    byId('source-code').textContent = clipboardCode(item, true);
    setDownload('download-native', item.native, item);
    setDownload('download-svg', item.svg, item);
    setDownload('download-png', item.png, item);
    for (const [id, format] of [['copy-code', 'native'], ['copy-svg', 'svg'], ['copy-png', 'png']]) {
      const button = byId(id);
      button.onclick = () => copy(item, format, button);
      button.setAttribute('aria-label', '复制「' + item.title + '」的 ' + (format === 'native' ? 'Excalidraw 图元' : format.toUpperCase()));
    }
    prefetch(item);
  }

  function openDetail(item, opener) {
    detailItems = visible.slice();
    returnFocus = opener;
    showDetail(detailItems.indexOf(item));
    byId('source-panel').open = false;
    if (!detail.open) detail.showModal();
    document.body.classList.add('dialog-open');
  }

  search.addEventListener('input', render);
  search.addEventListener('search', render);
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !filters.contains(button)) return;
    category = button.dataset.filter;
    render();
  });
  byId('detail-close').addEventListener('click', () => detail.close());
  byId('detail-prev').addEventListener('click', () => showDetail(detailIndex - 1));
  byId('detail-next').addEventListener('click', () => showDetail(detailIndex + 1));
  byId('toggle-grid').addEventListener('click', event => {
    const enabled = byId('detail-stage').classList.toggle('checker');
    event.currentTarget.setAttribute('aria-pressed', String(enabled));
  });
  detail.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && detailIndex > 0) {event.preventDefault(); showDetail(detailIndex - 1);}
    if (event.key === 'ArrowRight' && detailIndex < detailItems.length - 1) {event.preventDefault(); showDetail(detailIndex + 1);}
  });
  detail.addEventListener('click', event => {
    if (event.target !== detail) return;
    const bounds = detail.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) detail.close();
  });
  detail.addEventListener('close', () => {
    document.body.append(toastNode);
    document.body.classList.remove('dialog-open');
    if (returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll: true});
  });
  document.addEventListener('keydown', event => {
    const target = event.target;
    const editing = target instanceof Element && (target.matches('input, textarea') || target.isContentEditable);
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !editing && !detail.open) {
      event.preventDefault();
      search.focus();
    }
  });
  const reset = byId('reset-search');
  if (reset) reset.addEventListener('click', () => {search.value = ''; category = 'all'; render(); search.focus();});
  render();
})();
