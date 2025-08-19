import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
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

          {/* Navigation */}
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