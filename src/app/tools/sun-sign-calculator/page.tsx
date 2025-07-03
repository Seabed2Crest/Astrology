import { SunSignCalculatorForm } from '@/components/tools/sun-sign-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun } from 'lucide-react';

export default function SunSignCalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Sun className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Sun Sign Calculator</CardTitle>
            <CardDescription>
              Find your zodiac sign based on your date of birth.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SunSignCalculatorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
