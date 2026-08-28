import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, WifiOff, Check } from 'lucide-react';

export const InstallAppBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissedTime = localStorage.getItem('toolnest_pwa_dismissed');
    const isDismissed = dismissedTime && Date.now() - parseInt(dismissedTime, 10) < 7 * 24 * 60 * 60 * 1000;

    // Listen for PWA install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isDismissed) {
        setShowInstallBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    localStorage.setItem('toolnest_pwa_dismissed', Date.now().toString());
  };

  // Offline status notification bar
  if (!isOnline) {
    return (
      <div style={{
        background: '#3B82F6',
        color: '#FFFFFF',
        padding: '0.5rem 1rem',
        fontSize: '0.85rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        zIndex: 9999,
        position: 'sticky',
        top: 0
      }}>
        <WifiOff size={16} />
        <span>You are currently offline. ToolNest continues to work locally in your browser!</span>
      </div>
    );
  }

  // Install prompt banner
  if (!showInstallBanner || isInstalled) return null;

  return (
    <div style={{
      background: 'linear-gradient(90deg, #1E293B 0%, #0F172A 100%)',
      borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
      color: '#FFFFFF',
      padding: '0.65rem 1.25rem',
      position: 'relative',
      zIndex: 999
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#2563EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            flexShrink: 0
          }}>
            <Smartphone size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: '700' }}>
              Install ToolNest App
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Add to your home screen or desktop for fast 1-click access & offline utility execution.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleInstallClick}
            className="btn btn-primary btn-sm"
            style={{
              padding: '0.35rem 0.85rem',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              borderRadius: '6px'
            }}
          >
            <Download size={14} /> Install App
          </button>
          <button
            onClick={handleDismiss}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
            title="Dismiss"
            aria-label="Dismiss banner"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
