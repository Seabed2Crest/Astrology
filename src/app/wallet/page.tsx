import { transactions } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Wallet, Landmark, CreditCard, Gift } from 'lucide-react';

const statusVariantMap = {
    success: 'default',
    pending: 'secondary',
    failed: 'destructive',
} as const;

export default function WalletPage() {
  const balance = transactions.reduce((acc, t) => {
    if (t.type === 'credit' && t.status === 'success') return acc + t.amount;
    if (t.type === 'debit' && t.status === 'success') return acc - t.amount;
    return acc;
  }, 500); // Starting with a base balance for demo

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary mb-2 font-headline">
          My Wallet
        </h1>
        <p className="text-[17px] md:text-lg  text-muted-foreground">
          Manage your funds and transactions with ease.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recharge Your Wallet</CardTitle>
              <CardDescription>
                Add money to your wallet for seamless consultations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[100, 200, 500, 1000].map((amount) => (
                  <Button key={amount} variant="outline">
                    ₹{amount}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                 <Label>Payment Method</Label>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="justify-start"><Landmark className="mr-2 h-4 w-4"/> UPI</Button>
                    <Button variant="outline" className="justify-start"><CreditCard className="mr-2 h-4 w-4"/> Cards</Button>
                    <Button variant="outline" className="justify-start"><Wallet className="mr-2 h-4 w-4"/> Netbanking</Button>
                 </div>
              </div>
              <Button className="w-full">Proceed to Pay</Button>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Input placeholder="Enter Coupon Code" className="flex-grow"/>
                <Button variant="secondary" className="w-full sm:w-auto"><Gift className="mr-2 h-4 w-4" />Apply Coupon</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-8">
        <Card className="bg-white dark:bg-muted shadow-lg border rounded-2xl">
  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
    <CardTitle className="text-lg font-medium text-muted-foreground">
      Current Balance
    </CardTitle>
    <span className="text-sm text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded-md">
      ₹/min
    </span>
  </CardHeader>
  <CardContent>
    <p className="text-4xl font-bold text-primary font-mono">
      ₹{balance.toFixed(2)}
    </p>
  </CardContent>
</Card>


          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.slice(0, 5).map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">{transaction.date}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={cn('font-semibold', transaction.type === 'credit' ? 'text-green-600' : 'text-red-600')}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                        </div>
                         <Badge variant={statusVariantMap[transaction.status]} className="capitalize text-xs mt-1">{transaction.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
