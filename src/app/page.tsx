import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Gem,
  MessageCircle,
  Radio,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';

const dashboardFeatures = [
  {
    title: 'Your Daily Horoscope',
    description: "Get your personalized daily insights. Let the stars guide your day.",
    link: '/horoscope',
    linkText: 'Check Horoscope',
    icon: Sparkles,
    bgClass: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    title: 'Talk to an Astrologer',
    description: 'Connect with expert astrologers for one-on-one consultations.',
    link: '/astrologers',
    linkText: 'Find an Astrologer',
    icon: MessageCircle,
    bgClass: 'bg-blue-100 dark:bg-blue-900/30',
  },
];

const otherFeatures = [
  {
    title: 'Live Sessions',
    icon: Radio,
    description: 'Join live sessions with famous astrologers.',
  },
  {
    title: 'AstroShop',
    icon: ShoppingBag,
    description: 'Buy genuine gemstones and remedies.',
  },
  {
    title: 'Karma Points',
    icon: Gem,
    description: 'Earn points and get exciting rewards.',
  },
];

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <section className="text-center mb-12">
        <h1 className="text-2xl md:text-5xl font-bold text-primary mb-2 font-headline">
          Welcome to Seabed2Crest Astrotalk
        </h1>
        <p className="text-[16px] md:text-lg  text-muted-foreground">
          Discover your path with guidance from the stars and trusted
          astrologers.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {dashboardFeatures.map((feature) => (
          <Card
            key={feature.title}
            className={`overflow-hidden transition-shadow hover:shadow-lg ${feature.bgClass}`}
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <feature.icon className="w-8 h-8 text-primary" />
              <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Link href={feature.link}>
                <Button>
                  {feature.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-headline">
          Explore More
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherFeatures.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card className="relative overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop"
            alt="Featured Astrologer"
            width={1200}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="astrology space"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h2 className="text-xl md:text-3xl font-bold mb-2 font-headline">
              Live Now: Vedic Astrology Secrets
            </h2>
            <p className="mb-4 text-[14px] md:text-lg">
              Join Astro Neha as she unveils the secrets of planetary transits.
            </p>
            <Button variant="secondary">Join Live Session</Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
