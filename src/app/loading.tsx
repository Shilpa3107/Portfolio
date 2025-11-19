import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex animate-pulse flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">
            Building your portfolio...
          </p>
          <p className="text-sm text-muted-foreground">
            The AI is working its magic. Please wait a moment.
          </p>
        </div>
      </div>
    </div>
  );
}
