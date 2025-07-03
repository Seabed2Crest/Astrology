import { FriendshipScoreForm } from '@/components/tools/friendship-score-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function FriendshipScorePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
                <Users className="w-12 h-12 text-primary" />
            </div>
        </div>
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Friendship Score Calculator</CardTitle>
            <CardDescription>
              Find out how strong your friendship bond is!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FriendshipScoreForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
