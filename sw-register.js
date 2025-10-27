if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/pwabuilder-sw.js');
      console.log('Service Worker مسجّل:', reg);

      // التحقق من وجود تحديثات وتنشيطها فوراً
      if (reg.waiting) {
        // اذا كان هناك waiting SW (نسخة جديدة) اطلب التحديث فوراً
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // نسخة جديدة جاهزة
            console.log('نسخة جديدة من الـ Service Worker جاهزة');
            // يمكنك إعلام المستخدم بوجود تحديث وإعادة تحميل الصفحة
          }
        });
      });
    } catch (err) {
      console.warn('خطأ عند تسجيل Service Worker:', err);
    }
  });
}