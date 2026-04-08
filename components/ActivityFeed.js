'use client';

import { formatDistanceToNow } from 'date-fns';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  User, 
  MessageSquare,
  GitBranch,
  Zap
} from 'lucide-react';

const ACTIVITY_ICONS = {
  task_created: MessageSquare,
  task_completed: CheckCircle,
  task_moved: GitBranch,
  task_assigned: User,
  task_commented: MessageSquare,
  urgent: AlertCircle,
  progress: Zap,
};

export default function ActivityFeed({ activities }) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-4 h-4 text-blue-400" />
        Activity Feed
      </h3>

      <div className="flex-1 overflow-y-auto space-y-3">
        {activities && activities.length > 0 ? (
          activities.map((activity, idx) => {
            const Icon = ACTIVITY_ICONS[activity.type] || AlertCircle;
            const bgColor = 
              activity.type === 'task_completed' ? 'bg-green-500/10 border-green-500/30' :
              activity.type === 'task_moved' ? 'bg-blue-500/10 border-blue-500/30' :
              activity.type === 'urgent' ? 'bg-red-500/10 border-red-500/30' :
              'bg-gray-700/50 border-gray-600/30';

            return (
              <div key={idx} className={`border rounded-lg p-3 transition-all hover:bg-gray-700/50 ${bgColor}`}>
                <div className="flex gap-3">
                  <Icon className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white leading-snug">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </span>
                      {activity.agent && (
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                          {activity.agent}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-sm">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}
