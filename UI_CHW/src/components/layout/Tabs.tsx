import React from 'react';

interface TabItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  children: React.ReactNode;
}

export default function Tabs({ tabs, activeTab, setActiveTab, children }: TabsProps) {
  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-150 ${
                activeTab === tab.id
                  ? 'border-blue-700 text-blue-700 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-blue-700 hover:bg-blue-50'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          );
        })}
      </div>
      {/* Tab Content */}
      <div>{children}</div>
    </div>
  );
} 