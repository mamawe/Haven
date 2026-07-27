// 锚点 Haven Service Worker —— 离线缓存 + 更新激活 + 通知处理
const CACHE = 'haven-v1'
const APP_SHELL = ['/']

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

// 收到跳过等待指令：立即激活新版本
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting()
})

// 离线缓存：导航走 network-first 回退到应用壳；静态资源走 stale-while-revalidate
self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('/').then(r => r || caches.match('/index.html')))
    )
    return
  }

  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req)
      const network = fetch(req).then(res => {
        if (res && res.status === 200) cache.put(req, res.clone())
        return res
      }).catch(() => cached)
      return cached || network
    })
  )
})

self.addEventListener('notificationclick', (e) => {
  e.notification.close()
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      const url = '/'
      for (const client of clients) {
        if ('focus' in client) return client.focus()
      }
      if (self.clients.openWindow) return self.clients.openWindow(url)
    })
  )
})
