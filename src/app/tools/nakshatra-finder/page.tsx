import { NakshatraFinderForm } from '@/components/tools/nakshatra-finder-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

export default function NakshatraFinderPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Star className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Nakshatra Finder</CardTitle>
            <CardDescription>
              Discover your birth star (Nakshatra) and its secrets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NakshatraFinderForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
