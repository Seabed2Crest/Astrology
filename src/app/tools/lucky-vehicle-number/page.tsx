import { LuckyVehicleNumberForm } from '@/components/tools/lucky-vehicle-number-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car } from 'lucide-react';

export default function LuckyVehicleNumberPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Car className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Lucky Vehicle Number Finder</CardTitle>
            <CardDescription>
              Check if your vehicle number is lucky for you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LuckyVehicleNumberForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
