import React from 'react';
import { Award, Download, Share2, Star } from 'lucide-react';

const Certificate = ({ certificate, onDownload, onShare }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Certificate Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
        <Award className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Certificate of Completion</h1>
        <p className="text-blue-100">Polyglo Language Learning Platform</p>
      </div>

      {/* Certificate Body */}
      <div className="p-12 text-center">
        <div className="mb-8">
          <p className="text-gray-600 text-lg mb-4">This is to certify that</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {certificate.user_name}
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            has successfully completed the
          </p>
          <h3 className="text-3xl font-bold text-blue-600 mb-8">
            {certificate.course_level.language.name} {certificate.course_level.get_difficulty_display()} Course
          </h3>
        </div>

        {/* Achievement Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 text-sm">Final Score</p>
            <p className="text-2xl font-bold text-gray-900">{certificate.final_score}%</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-600 text-sm">Completion Date</p>
            <p className="text-2xl font-bold text-gray-900">{formatDate(certificate.issued_at)}</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-purple-600">#</span>
            </div>
            <p className="text-gray-600 text-sm">Certificate ID</p>
            <p className="text-lg font-mono text-gray-900">{certificate.certificate_id}</p>
          </div>
        </div>

        {/* Signature Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-32 h-1 bg-gray-300 mx-auto mb-2"></div>
              <p className="font-semibold text-gray-900">Polyglo Team</p>
              <p className="text-sm text-gray-600">Language Learning Platform</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-1 bg-gray-300 mx-auto mb-2"></div>
              <p className="font-semibold text-gray-900">{formatDate(certificate.issued_at)}</p>
              <p className="text-sm text-gray-600">Date of Issue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Footer */}
      <div className="bg-gray-50 p-6 text-center">
        <p className="text-sm text-gray-600 mb-4">
          Verify this certificate at polyglo.com/verify/{certificate.certificate_id}
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => onDownload(certificate)}
            className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
          </button>
          
          <button
            onClick={() => onShare(certificate)}
            className="flex items-center bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Certificate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
