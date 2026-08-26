import React from 'react';
import { Sparkles, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

interface PlaceholderRoutePageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function PlaceholderRoutePage({ title, description, icon }: PlaceholderRoutePageProps) {
  const { navigate } = useAuth();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
      <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
          {icon || <Sparkles className="w-7 h-7" />}
        </div>
        <CardTitle className="text-2xl font-bold font-display text-slate-900 dark:text-white mb-2">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
          {description}
        </CardDescription>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 mb-8">
          <span>Scheduled for upcoming prompt iterations</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/')}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Home
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto bg-brand hover:bg-brand-dark"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
