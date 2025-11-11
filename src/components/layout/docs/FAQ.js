import { ChevronRight, FileText, MessageCircle } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const FAQ_Docs = () => {
  const faqs = [
    {
      question: "Can DVN Technology be used with .NET Core?",
      answer: "Yes, DVN Technology fully supports .NET Core integration. Check our documentation for implementation details."
    },
    {
      question: "Is there an integration guide for React and .NET?",
      answer: "We provide comprehensive guides for integrating React with .NET applications in our documentation."
    },
    {
      question: "What technologies does DVN Technology support?",
      answer: "DVN Technology supports .NET, SQL Server, Python, React, and TailwindCSS among others."
    },
    {
      question: "How do I get notified of new DVN Technology versions?",
      answer: "Subscribe to our newsletter or follow our release notes page to stay updated with new versions."
    },
    {
      question: "Does DVN Technology support Python integration?",
      answer: "Yes, Python integration is fully supported. Visit our documentation for integration examples."
    },
    {
      question: "Why TailwindCSS instead of Bootstrap?",
      answer: "TailwindCSS offers utility-first approach providing more flexibility and smaller bundle sizes for modern applications."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">FAQ</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Docs<span className="text-blue-600">FAQ</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to commonly asked questions about DVN Technology integrations and features
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Anything you want
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Can't find what you're looking for?
          </p>
          <p className="text-blue-50 mb-8 max-w-2xl mx-auto">
            Feel free to reach out to our support team or check our comprehensive documentation
            for more detailed information about integrating .NET, SQL Server, Python, React,
            and TailwindCSS in your projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Link>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-blue-400">
              <FileText className="w-5 h-5 mr-2" />
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ_Docs;
