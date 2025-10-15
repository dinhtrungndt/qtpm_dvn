import { Maximize2, Minimize2, Minus, Plus, X } from 'lucide-react';
import { memo, useState } from 'react';
import { Link } from 'react-router-dom';

// Memoized Card Components để tránh re-render
const CardAbility = memo(({ id, title, icon: Icon, bgColor, textColor, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  if (isRemoved) return null;

  return (
    <div className={`card-animate rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${bgColor}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-5 py-4 flex items-center justify-between ${textColor} hover:opacity-90 transition-opacity`}
        type="button"
      >
        <span className="font-semibold text-base">{title}</span>
        <Icon className="w-5 h-5" />
      </button>
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 py-4 bg-white border-t border-gray-200">
          <p className="text-gray-700 text-sm">{content || 'The body of the card'}</p>
        </div>
      </div>
    </div>
  );
});

const CardRemovable = memo(({ id, title, bgColor, content, isOutlined, borderColor }) => {
  const [isRemoved, setIsRemoved] = useState(false);

  if (isRemoved) return null;

  const baseClass = isOutlined
    ? `card-animate bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-2 ${borderColor}`
    : `card-animate rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${bgColor}`;

  const buttonClass = isOutlined
    ? "w-full px-5 py-4 flex items-center justify-between text-yellow-600 hover:bg-yellow-50 transition-colors"
    : "w-full px-5 py-4 flex items-center justify-between text-white hover:opacity-90 transition-opacity";

  const bodyClass = isOutlined
    ? "px-5 py-4 bg-white border-t border-gray-200"
    : `px-5 py-4 ${bgColor} border-t border-white/20`;

  const textClass = isOutlined ? "text-gray-700" : "text-white";

  return (
    <div className={`${baseClass} ${isRemoved ? 'card-remove' : ''}`}>
      <button
        onClick={() => setIsRemoved(true)}
        className={buttonClass}
        type="button"
      >
        <span className="font-semibold text-base">{title}</span>
        <X className="w-5 h-5" />
      </button>
      <div className={bodyClass}>
        <p className={`${textClass} text-sm`}>{content || 'Click the X button to remove this card.'}</p>
      </div>
    </div>
  );
});

const CardMaximizable = memo(({ id, title, icon: Icon, bgColor, textColor, content, isOutlined, borderColor, hoverBg }) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => setIsMaximized(!isMaximized);

  return (
    <>
      <div className={`card-animate rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${isOutlined ? `bg-white border-2 ${borderColor}` : bgColor} ${isMaximized ? 'hidden' : ''}`}>
        <button
          onClick={toggleMaximize}
          className={`w-full px-5 py-4 flex items-center justify-between ${textColor} ${isOutlined ? hoverBg : 'hover:opacity-90'} transition-${isOutlined ? 'colors' : 'opacity'}`}
          type="button"
        >
          <span className="font-semibold text-base">{title}</span>
          <Maximize2 className="w-5 h-5" />
        </button>
        <div className={`px-5 py-4 ${isOutlined ? 'bg-white' : bgColor} border-t ${isOutlined ? 'border-gray-200' : 'border-white/20'}`}>
          <p className={`${textColor} text-sm`}>{content || 'Click to maximize this card to full screen.'}</p>
        </div>
      </div>

      {isMaximized && (
        <div className="fixed inset-0 z-50 bg-black/90 animate-fade-in" onClick={toggleMaximize}>
          <div
            className={`absolute inset-0 rounded-xl shadow-2xl animate-scale-in flex flex-col ${isOutlined ? `bg-white border-4 ${borderColor}` : bgColor}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`px-6 py-4 flex items-center justify-between rounded-t-xl ${isOutlined ? `bg-white border-b-2 ${borderColor}` : `border-b ${bgColor} border-white/20`}`}>
              <span className={`font-semibold text-xl ${textColor}`}>{title}</span>
              <button
                onClick={toggleMaximize}
                className={`p-2 rounded-lg transition-colors ${isOutlined ? hoverBg : 'hover:bg-white/20'}`}
                type="button"
              >
                <Minimize2 className={`w-6 h-6 ${textColor}`} />
              </button>
            </div>
            <div className={`flex-1 p-6 overflow-auto ${textColor}`}>
              <p className="text-lg font-medium mb-4">{content || 'Click to maximize this card to full screen.'}</p>
              <div className={isOutlined ? 'text-gray-600' : 'opacity-90'}>
                <p className="mb-3">This is the maximized view. You can add more content here.</p>
                <p className="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

const CardOutlined = memo(({ id, title, icon: Icon, borderColor, textColor, hoverBg, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`card-animate bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-2 ${borderColor}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-5 py-4 flex items-center justify-between ${textColor} ${hoverBg} transition-colors`}
        type="button"
      >
        <span className="font-semibold text-base">{title}</span>
        <Icon className="w-5 h-5" />
      </button>
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 py-4 bg-white border-t border-gray-200">
          <p className="text-gray-700 text-sm">{content || 'The body of the card'}</p>
        </div>
      </div>
    </div>
  );
});

const CardTextBg = memo(({ id, title, icon: Icon, bgColor, textColor, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`card-animate rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${bgColor}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-5 py-4 flex items-center justify-between ${textColor} hover:opacity-90 transition-opacity`}
        type="button"
      >
        <span className="font-semibold text-base">{title}</span>
        <Icon className="w-5 h-5" />
      </button>
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={`px-5 py-4 ${bgColor} border-t border-white/20`}>
          <p className={`${textColor} text-sm`}>{content || 'The body of the card'}</p>
        </div>
      </div>
    </div>
  );
});

const Cards = () => {
  return (
    <div className="bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Cards</h1>
        <div className="flex items-center gap-2 text-xs">
          <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors">Trang chủ</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">Cards</span>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Abilities Section */}
        <div className="animate-slide-up">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Abilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardAbility
              id="abilities1"
              title="Expandable"
              icon={Plus}
              bgColor="bg-blue-500"
              textColor="text-white"
              content="This card can be expanded to show more content."
            />
            <CardAbility
              id="abilities2"
              title="Collapsable"
              icon={Minus}
              bgColor="bg-green-600"
              textColor="text-white"
              content="This card can be collapsed to hide content."
            />
            <CardRemovable
              id="abilities3"
              title="Removable"
              bgColor="bg-yellow-500"
              content="Click the X button to remove this card."
            />
            <CardMaximizable
              id="abilities4"
              title="Maximizable"
              icon={Maximize2}
              bgColor="bg-red-500"
              textColor="text-white"
              content="Click to maximize this card to full screen."
            />
          </div>
        </div>

        {/* Card Outlined Section */}
        <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Card Outlined</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardOutlined
              id="outlined1"
              title="Expandable"
              icon={Plus}
              borderColor="border-blue-500"
              textColor="text-blue-600"
              hoverBg="hover:bg-blue-50"
              content="This outlined card can be expanded."
            />
            <CardOutlined
              id="outlined2"
              title="Collapsable"
              icon={Minus}
              borderColor="border-green-600"
              textColor="text-green-700"
              hoverBg="hover:bg-green-50"
              content="This outlined card can be collapsed."
            />
            <CardRemovable
              id="outlined3"
              title="Removable"
              isOutlined={true}
              borderColor="border-yellow-500"
              content="Click the X to remove this outlined card."
            />
            <CardMaximizable
              id="abilities4"
              title="Maximizable"
              icon={Maximize2}
              borderColor="border-red-500"
              textColor="text-red-600"
              hoverBg="hover:bg-red-50"
              content="Click to maximize this card to full screen."
              isOutlined={true}
            />
          </div>
        </div>

        {/* Card with text-bg Section */}
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Card with <code className="px-2 py-1 bg-pink-100 text-pink-600 rounded text-sm font-mono">.text-bg-*</code>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardTextBg
              id="textBg1"
              title="Expandable"
              icon={Plus}
              bgColor="bg-blue-500"
              textColor="text-white"
              content="This card has colored background."
            />
            <CardTextBg
              id="textBg2"
              title="Collapsable"
              icon={Minus}
              bgColor="bg-green-600"
              textColor="text-white"
              content="This card can be collapsed."
            />
            <CardRemovable
              id="textBg3"
              title="Removable"
              bgColor="bg-yellow-500"
              content="Click the X to remove this card."
            />
            <CardMaximizable
              id="textBg4"
              title="Maximizable"
              icon={Maximize2}
              bgColor="bg-red-500"
              textColor="text-white"
              content="Click to maximize this card to full screen."
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes card-remove {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.95) rotateZ(3deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
            height: 0;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.7s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out forwards;
        }

        .card-animate {
          animation: slide-up 0.6s ease-out forwards;
        }

        .card-remove {
          animation: card-remove 0.5s ease-out forwards;
        }

        code {
          font-family: 'Courier New', monospace;
        }
      `}</style>
    </div>
  );
};

export default Cards;
