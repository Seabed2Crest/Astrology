import { NumerologyCalculatorForm } from '@/components/tools/numerology-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sigma } from 'lucide-react';

export default function NumerologyCalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Sigma className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Numerology Calculator</CardTitle>
            <CardDescription>
              Explore your core numbers and what they mean for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NumerologyCalculatorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
