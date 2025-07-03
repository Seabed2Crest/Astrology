import { LoShuGridForm } from '@/components/tools/lo-shu-grid-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

export default function LoShuGridPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-lg">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Calculator className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Lo Shu Grid Calculator</CardTitle>
            <CardDescription>
              Discover your numerological chart based on your date of birth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoShuGridForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
