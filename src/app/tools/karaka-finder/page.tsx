import { KarakaFinderForm } from '@/components/tools/karaka-finder-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem } from 'lucide-react';

export default function KarakaFinderPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Gem className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Atmakaraka &amp; Darakaraka Calculator</CardTitle>
            <CardDescription>
              Find your soul (Atmakaraka) and spouse (Darakaraka) significators.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <KarakaFinderForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
