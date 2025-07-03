import { AgeCalculatorForm } from '@/components/tools/age-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cake } from 'lucide-react';

export default function AgeCalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Cake className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Age Calculator</CardTitle>
            <CardDescription>
              Enter your date of birth to find out your exact age.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AgeCalculatorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
