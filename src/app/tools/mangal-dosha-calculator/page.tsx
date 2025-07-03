import { MangalDoshaCalculatorForm } from '@/components/tools/mangal-dosha-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Swords } from 'lucide-react';

export default function MangalDoshaCalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Swords className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Mangal Dosha Calculator</CardTitle>
            <CardDescription>
              Check if you have Manglik (or Kuja) Dosha in your chart.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MangalDoshaCalculatorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
