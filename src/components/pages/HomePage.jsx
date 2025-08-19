import React from "react";
import ApperIcon from "@/components/ApperIcon";
import FileUploader from "@/components/organisms/FileUploader";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Upload Files with
              <span className="gradient-text"> Confidence</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Drag, drop, and upload multiple files effortlessly. Track progress in real-time 
              with our secure and intuitive file upload utility.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-3">
                <ApperIcon name="Zap" className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Lightning Fast</h3>
              <p className="text-sm text-gray-600">Optimized upload speeds with real-time progress tracking</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-3">
                <ApperIcon name="Shield" className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure & Safe</h3>
              <p className="text-sm text-gray-600">Enterprise-grade security for all your uploads</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-3">
                <ApperIcon name="Layers" className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Batch Upload</h3>
              <p className="text-sm text-gray-600">Upload multiple files simultaneously with ease</p>
            </div>
          </div>
        </div>
      </section>

      {/* File Uploader Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <FileUploader />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for efficient file management and uploads
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <ApperIcon name="Upload" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Drag & Drop</h3>
              <p className="text-gray-600">
                Simply drag files from your computer and drop them into the upload zone for instant processing.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <ApperIcon name="BarChart3" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Progress</h3>
              <p className="text-gray-600">
                Monitor upload progress with detailed progress bars and completion statistics.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <ApperIcon name="Image" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">File Preview</h3>
              <p className="text-gray-600">
                Get instant previews of image files with automatic thumbnail generation.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                <ApperIcon name="AlertTriangle" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Handling</h3>
              <p className="text-gray-600">
                Comprehensive error handling with retry options for failed uploads.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <ApperIcon name="FileCheck" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">File Validation</h3>
              <p className="text-gray-600">
                Automatic file size and type validation with clear error messaging.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <ApperIcon name="Smartphone" className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">
                Fully responsive design that works seamlessly across all devices and screen sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section id="help" className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Need Help?
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ApperIcon name="HelpCircle" className="w-5 h-5 text-purple-600" />
                What file types are supported?
              </h3>
              <p className="text-gray-600">
                DropZone supports all common file types including images, videos, documents, archives, and more. 
                Each file must be under 100MB in size.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ApperIcon name="Shield" className="w-5 h-5 text-green-600" />
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Yes! All uploads are secured with enterprise-grade encryption. Your files are processed locally 
                in your browser for maximum privacy and security.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <ApperIcon name="Zap" className="w-5 h-5 text-blue-600" />
                How many files can I upload at once?
              </h3>
              <p className="text-gray-600">
                There's no strict limit on the number of files you can upload simultaneously. However, 
                for optimal performance, we recommend uploading files in batches.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;