import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
            <li>
              <a
                href={item.href}
                className={`text-sm ${
                  index === items.length - 1
                    ? 'text-gray-600 dark:text-gray-300 font-medium'
                    : 'text-purple-400 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200'
                }`}
              >
                {item.label}
              </a>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}