import React, { useState, useRef, useEffect, useContext } from "react";
import { useSelector } from 'react-redux';
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { AuthContext } from "../../App";

const Header = ({ settings, onSettingsChange }) => {
  const { logout } = useContext(AuthContext);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const fileTypeOptions = [
    { id: 'all', label: 'All Files', types: ['*/*'] },
    { id: 'images', label: 'Images Only', types: ['image/*'] },
    { id: 'videos', label: 'Videos Only', types: ['video/*'] },
    { id: 'documents', label: 'Documents Only', types: ['application/pdf', 'text/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] },
    { id: 'media', label: 'Media Files', types: ['image/*', 'video/*', 'audio/*'] },
    { id: 'archives', label: 'Archives Only', types: ['application/zip', 'application/x-rar-compressed'] }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (filterId) => {
    const selectedFilter = fileTypeOptions.find(option => option.id === filterId);
    onSettingsChange({
      ...settings,
      fileTypeFilter: filterId,
      allowedTypes: selectedFilter.types
    });
    setIsSettingsOpen(false);
  };

  const currentFilter = fileTypeOptions.find(option => option.id === settings?.fileTypeFilter) || fileTypeOptions[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-600 to-green-600 rounded-xl">
              <ApperIcon name="Upload" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">DropZone</h1>
              <p className="text-xs text-gray-600">File Upload Utility</p>
            </div>
          </div>

{/* Navigation & Settings */}
<div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="#features" 
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                Features
              </a>
              <a 
                href="#help" 
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors duration-200"
              >
                Help
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ApperIcon name="Shield" className="w-4 h-4 text-green-500" />
                <span>Secure Upload</span>
              </div>
            </nav>

            {/* User Profile and Logout */}
            {isAuthenticated && user && (
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">
                  Welcome, {user.firstName || user.name || 'User'}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="gap-2"
                >
                  <ApperIcon name="LogOut" size={14} />
                  Logout
                </Button>
              </div>
            )}

            {/* Settings Dropdown */}
            <div className="relative" ref={settingsRef}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="relative"
              >
                <ApperIcon name="Settings" className="w-5 h-5" />
              </Button>

              {isSettingsOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-medium text-gray-900">File Type Filter</h3>
                    <p className="text-xs text-gray-500 mt-1">Restrict which file types can be uploaded</p>
                  </div>
                  
                  <div className="py-2">
                    {fileTypeOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleFilterChange(option.id)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-purple-50 transition-colors duration-150 ${
                          settings?.fileTypeFilter === option.id 
                            ? 'bg-purple-50 text-purple-700 font-medium' 
                            : 'text-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            settings?.fileTypeFilter === option.id 
                              ? 'bg-purple-500' 
                              : 'bg-gray-300'
                          }`} />
                          {option.label}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="px-4 py-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <ApperIcon name="Filter" className="w-3 h-3" />
                      Current: {currentFilter.label}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200">
              <ApperIcon name="Menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;