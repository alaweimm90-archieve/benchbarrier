import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Cookie, Settings } from 'lucide-react';

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setPreferences(onlyNecessary);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-black/95 backdrop-blur-xl border border-luxury-gold/20 rounded-2xl p-6 shadow-luxury">
              {!showSettings ? (
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Cookie className="w-6 h-6 text-luxury-gold flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-playfair font-bold text-white mb-2">
                        We Value Your Privacy
                      </h3>
                      <p className="text-gray-300 text-sm">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                        By clicking "Accept All", you consent to our use of cookies.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <Button
                      onClick={() => setShowSettings(true)}
                      variant="outline"
                      className="border-luxury-gold/30 text-luxury-gold hover:bg-luxury-gold/10"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Customize
                    </Button>
                    <Button
                      onClick={handleRejectAll}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Reject All
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-luxury-gold text-black hover:bg-luxury-gold/90"
                    >
                      Accept All
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-playfair font-bold text-white">
                      Cookie Preferences
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-gray-400 hover:text-white"
                      aria-label="Close settings"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">Necessary Cookies</h4>
                        <p className="text-sm text-gray-400">
                          Required for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.necessary}
                          disabled
                          className="w-5 h-5"
                        />
                      </div>
                    </div>

                    <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">Analytics Cookies</h4>
                        <p className="text-sm text-gray-400">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </div>
                    </div>

                    <div className="flex items-start justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">Marketing Cookies</h4>
                        <p className="text-sm text-gray-400">
                          Used to deliver personalized advertisements and track campaign performance.
                        </p>
                      </div>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="w-5 h-5"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={() => setShowSettings(false)}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSavePreferences}
                      className="bg-luxury-gold text-black hover:bg-luxury-gold/90"
                    >
                      Save Preferences
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
