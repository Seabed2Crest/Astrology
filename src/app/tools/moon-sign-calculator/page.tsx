import { MoonSignCalculatorForm } from '@/components/tools/moon-sign-calculator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Moon } from 'lucide-react';

export default function MoonSignCalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Moon className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Moon Sign Calculator</CardTitle>
            <CardDescription>
              Find your Rashi (Moon Sign) based on your birth details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MoonSignCalculatorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
