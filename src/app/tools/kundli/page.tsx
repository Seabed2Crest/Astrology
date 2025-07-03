import { KundliGeneratorForm } from '@/components/tools/kundli-generator-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Orbit } from 'lucide-react';

export default function KundliPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-2xl">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Orbit className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Free Kundli / Birth Chart</CardTitle>
            <CardDescription>
              Generate your detailed Vedic Astrology birth chart.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <KundliGeneratorForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
