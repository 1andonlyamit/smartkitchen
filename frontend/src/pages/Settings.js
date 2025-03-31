import React, { useState } from 'react';
import Layout from '../components/layout/Layout_';
import Footer from '../components/footer/Footer';
import { Save, RefreshCcw, Bell, Eye, ShieldCheck, Database, Server, Clock, Image } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";

function Settings() {
  // State for settings
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    lowStockAlerts: true,
    expiryReminders: true,
    
    // AI Processing Settings
    confidenceThreshold: 85,
    enableAutomaticProcessing: true,
    processingInterval: 'immediate',
    
    // Storage Settings
    imageQuality: 'high',
    storageLocation: 'local',
    retentionPeriod: 90,
    
    // Security Settings
    enableEncryption: true,
    allowedUsers: ['admin', 'kitchen_staff'],
    apiKeyVisible: false,
    apiKey: 'sk_live_kitchenAI_2025x03x31xABCDEF123456',
    
    // System Settings
    darkMode: true,
    language: 'en',
    dataBackupFrequency: 'daily'
  });

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // This would normally save to a backend
    alert('Settings saved successfully!');
  };

  // Toggle API key visibility
  const toggleApiKeyVisibility = () => {
    setSettings({
      ...settings,
      apiKeyVisible: !settings.apiKeyVisible
    });
  };

  // Reset settings to defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      setSettings({
        // Reset to defaults (same as initial state)
        emailNotifications: true,
        lowStockAlerts: true,
        expiryReminders: true,
        confidenceThreshold: 85,
        enableAutomaticProcessing: true,
        processingInterval: 'immediate',
        imageQuality: 'high',
        storageLocation: 'local',
        retentionPeriod: 90,
        enableEncryption: true,
        allowedUsers: ['admin', 'kitchen_staff'],
        apiKeyVisible: false,
        apiKey: 'sk_live_kitchenAI_2025x03x31xABCDEF123456',
        darkMode: true,
        language: 'en',
        dataBackupFrequency: 'daily'
      });
      alert('Settings have been reset to defaults');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 text-light">Settings</h2>
            {/* <div>
              <button
                className="btn btn-outline-secondary me-2 d-flex align-items-center shadow"
                onClick={resetToDefaults}
              >
                <RefreshCcw size={20} className="me-2" />
                <span>Reset Defaults</span>
              </button>
              <button
                className="btn btn-success d-flex align-items-center shadow"
                onClick={handleSubmit}
              >
                <Save size={20} className="me-2" />
                <span>Save Settings</span>
              </button>
            </div> */}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Notification Settings */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm bg-dark border-secondary h-100">
                  <div className="card-header bg-dark text-info border-secondary d-flex align-items-center">
                    <Bell size={20} className="me-2" />
                    <h5 className="mb-0">Notification Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                      />
                      <label className="form-check-label text-light" htmlFor="emailNotifications">
                        Email Notifications
                      </label>
                    </div>
                    <div className="mb-3 form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="lowStockAlerts"
                        checked={settings.lowStockAlerts}
                        onChange={(e) => handleInputChange('notifications', 'lowStockAlerts', e.target.checked)}
                      />
                      <label className="form-check-label text-light" htmlFor="lowStockAlerts">
                        Low Stock Alerts
                      </label>
                    </div>
                    <div className="mb-3 form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="expiryReminders"
                        checked={settings.expiryReminders}
                        onChange={(e) => handleInputChange('notifications', 'expiryReminders', e.target.checked)}
                      />
                      <label className="form-check-label text-light" htmlFor="expiryReminders">
                        Expiry Date Reminders
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Processing Settings */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm bg-dark border-secondary h-100">
                  <div className="card-header bg-dark text-info border-secondary d-flex align-items-center">
                    <Server size={20} className="me-2" />
                    <h5 className="mb-0">AI Processing Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="confidenceThreshold" className="form-label text-light">
                        AI Confidence Threshold ({settings.confidenceThreshold}%)
                      </label>
                      <input
                        type="range"
                        className="form-range"
                        min="50"
                        max="99"
                        id="confidenceThreshold"
                        value={settings.confidenceThreshold}
                        onChange={(e) => handleInputChange('ai', 'confidenceThreshold', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="mb-3 form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="enableAutomaticProcessing"
                        checked={settings.enableAutomaticProcessing}
                        onChange={(e) => handleInputChange('ai', 'enableAutomaticProcessing', e.target.checked)}
                      />
                      <label className="form-check-label text-light" htmlFor="enableAutomaticProcessing">
                        Enable Automatic Processing
                      </label>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="processingInterval" className="form-label text-light">
                        Processing Interval
                      </label>
                      <select 
                        className="form-select bg-dark text-light border-secondary"
                        id="processingInterval"
                        value={settings.processingInterval}
                        onChange={(e) => handleInputChange('ai', 'processingInterval', e.target.value)}
                      >
                        <option value="immediate">Immediate</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="manual">Manual Only</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Storage Settings */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm bg-dark border-secondary h-100">
                  <div className="card-header bg-dark text-info border-secondary d-flex align-items-center">
                    <Database size={20} className="me-2" />
                    <h5 className="mb-0">Storage Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="imageQuality" className="form-label text-light">
                        Image Quality
                      </label>
                      <select 
                        className="form-select bg-dark text-light border-secondary"
                        id="imageQuality"
                        value={settings.imageQuality}
                        onChange={(e) => handleInputChange('storage', 'imageQuality', e.target.value)}
                      >
                        <option value="low">Low (Faster Processing)</option>
                        <option value="medium">Medium</option>
                        <option value="high">High (Better Recognition)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="storageLocation" className="form-label text-light">
                        Storage Location
                      </label>
                      <select 
                        className="form-select bg-dark text-light border-secondary"
                        id="storageLocation"
                        value={settings.storageLocation}
                        onChange={(e) => handleInputChange('storage', 'storageLocation', e.target.value)}
                      >
                        <option value="local">Local Storage</option>
                        <option value="cloud">Cloud Storage</option>
                        <option value="hybrid">Hybrid (Local + Cloud Backup)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="retentionPeriod" className="form-label text-light">
                        Data Retention Period (days)
                      </label>
                      <input
                        type="number"
                        className="form-control bg-dark text-light border-secondary"
                        id="retentionPeriod"
                        value={settings.retentionPeriod}
                        onChange={(e) => handleInputChange('storage', 'retentionPeriod', parseInt(e.target.value))}
                        min="7"
                        max="365"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm bg-dark border-secondary h-100">
                  <div className="card-header bg-dark text-info border-secondary d-flex align-items-center">
                    <ShieldCheck size={20} className="me-2" />
                    <h5 className="mb-0">Security Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3 form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="enableEncryption"
                        checked={settings.enableEncryption}
                        onChange={(e) => handleInputChange('security', 'enableEncryption', e.target.checked)}
                      />
                      <label className="form-check-label text-light" htmlFor="enableEncryption">
                        Enable Data Encryption
                      </label>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="allowedUsers" className="form-label text-light">
                        Allowed User Roles
                      </label>
                      <select
                        className="form-select bg-dark text-light border-secondary"
                        id="allowedUsers"
                        multiple
                        value={settings.allowedUsers}
                        onChange={(e) => {
                          const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                          handleInputChange('security', 'allowedUsers', selectedOptions);
                        }}
                        style={{ height: '100px' }}
                      >
                        <option value="admin">Admin</option>
                        <option value="kitchen_staff">Kitchen Staff</option>
                        <option value="manager">Manager</option>
                        <option value="viewer">Viewer</option>
                      </select>
                      <small className="form-text text-muted">Hold Ctrl/Cmd to select multiple</small>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="apiKey" className="form-label text-light d-flex justify-content-between align-items-center">
                        <span>API Key</span>
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-info"
                          onClick={toggleApiKeyVisibility}
                        >
                          <Eye size={16} />
                        </button>
                      </label>
                      <input
                        type={settings.apiKeyVisible ? "text" : "password"}
                        className="form-control bg-dark text-light border-secondary"
                        id="apiKey"
                        value={settings.apiKey}
                        onChange={(e) => handleInputChange('security', 'apiKey', e.target.value)}
                        readOnly
                      />
                      <small className="form-text text-muted">Used for external API access</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div className="col-md-12 mb-4">
                <div className="card shadow-sm bg-dark border-secondary">
                  <div className="card-header bg-dark text-info border-secondary d-flex align-items-center">
                    <Clock size={20} className="me-2" />
                    <h5 className="mb-0">System Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="form-check form-switch">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="darkMode"
                            checked={settings.darkMode}
                            onChange={(e) => handleInputChange('system', 'darkMode', e.target.checked)}
                          />
                          <label className="form-check-label text-light" htmlFor="darkMode">
                            Dark Mode
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="language" className="form-label text-light">
                          Language
                        </label>
                        <select 
                          className="form-select bg-dark text-light border-secondary"
                          id="language"
                          value={settings.language}
                          onChange={(e) => handleInputChange('system', 'language', e.target.value)}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                          <option value="zh">Chinese</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="dataBackupFrequency" className="form-label text-light">
                          Data Backup Frequency
                        </label>
                        <select 
                          className="form-select bg-dark text-light border-secondary"
                          id="dataBackupFrequency"
                          value={settings.dataBackupFrequency}
                          onChange={(e) => handleInputChange('system', 'dataBackupFrequency', e.target.value)}
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="manual">Manual Only</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end mb-4">
              <button
                type="button"
                className="btn btn-outline-secondary me-2 d-flex align-items-center"
                onClick={resetToDefaults}
              >
                <RefreshCcw size={20} className="me-2" />
                <span>Reset to Defaults</span>
              </button>
              <button
                type="submit"
                className="btn btn-success d-flex align-items-center"
              >
                <Save size={20} className="me-2" />
                <span>Save Settings</span>
              </button>
            </div>
          </form>
        </div>
      </Layout>
      <Footer />
    </div>
  );
}

export default Settings;