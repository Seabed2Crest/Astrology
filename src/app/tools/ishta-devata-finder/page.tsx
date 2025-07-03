import { IshtaDevataFinderForm } from '@/components/tools/ishta-devata-finder-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function IshtaDevataFinderPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Sparkles className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Ishta Devata Finder</CardTitle>
            <CardDescription>
              Discover your personal deity for spiritual guidance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IshtaDevataFinderForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
