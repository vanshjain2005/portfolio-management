import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Bell, Save, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { cn } from '../utils';

const themeOptions = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
  { label: 'System', value: 'system' },
];

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
  { label: 'French', value: 'fr' },
];

const Settings = () => {
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-sm text-white/40 mt-1">Manage your application preferences</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Palette className="w-4 h-4 text-indigo-300" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white/90">Appearance</h2>
                  <p className="text-xs text-white/40 mt-0.5">Customize how the application looks</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Select label="Theme" value={theme} onChange={setTheme} options={themeOptions} />
                <Select label="Language" value={language} onChange={setLanguage} options={languageOptions} />
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-emerald-300" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white/90">Notifications</h2>
                  <p className="text-xs text-white/40 mt-0.5">Control what you get notified about</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3.5">
                <div>
                  <p className="text-sm font-medium text-white/90">Project notifications</p>
                  <p className="text-xs text-white/40 mt-0.5">Get notified when projects are created or updated</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications}
                  onClick={() => setNotifications((prev) => !prev)}
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300',
                    notifications ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/[0.1]'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300',
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center justify-end gap-4">
            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 text-sm text-emerald-400"
              >
                <Check className="w-4 h-4" /> Settings saved
              </motion.span>
            )}
            <Button onClick={saveSettings}>
              <Save className="w-4 h-4" /> Save Settings
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
