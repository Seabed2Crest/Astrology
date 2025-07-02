import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HoroscopeForm } from '@/components/horoscope/form';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function HoroscopePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
         
          <h1 className="text-[26px] md:text-5xl  font-bold text-primary font-headline">
            Your Daily Cosmic Forecast
          </h1>
          <p className="text-lg text-muted-foreground">
            Unveil the secrets of the stars. Enter your birth details to
            receive your personalized horoscope, crafted just for you by our
            advanced astrological AI.
          </p>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Generate Your Horoscope</CardTitle>
            </CardHeader>
            <CardContent>
              <HoroscopeForm />
            </CardContent>
          </Card>
        </div>
        <div className="relative h-64 md:h-96 lg:h-full min-h-[300px] rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1887&auto=format&fit=crop"
            alt="Cosmic background"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
            data-ai-hint="zodiac astrology"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
        </div>
      </div>
    </div>
  );
}
