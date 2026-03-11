import React from 'react';
import { cn } from '../../utils/cn';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  success: 'bg-green-50 text-green-800 border-green-200',
  error: 'bg-red-50 text-red-800 border-red-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

const Alert = ({ type = 'info', title, children, className }) => {
  const Icon = icons[type];
  const style = styles[type];

  return (
    <div className={cn('flex p-4 mb-4 rounded-lg border', style, className)} role="alert">
      <Icon className="flex-shrink-0 w-5 h-5 mr-3" />
      <div>
        {title && <h3 className="font-medium mb-1">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};

export default Alert;
