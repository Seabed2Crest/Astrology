import { SadeSatiCalculatorForm } from '@/components/tools/sade-sati-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale } from 'lucide-react';

export default function SadeSatiCalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-2xl">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Scale className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Sade Sati Calculator</CardTitle>
            <CardDescription>
              Check for Shani Sade Sati periods in your life based on your birth chart.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SadeSatiCalculatorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
