// TODO: Fix this when we turn strict mode on.
import { freePlan, proPlan } from '@/config/subscriptions';
import { UserSubscriptionPlan } from '@/types';

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = {
    id: '123456',
    name: 'manikanta',
    image: './vercel.svg',
    email: 'manikanta.potnuru@resonateaes.com',
    stripePriceId: 'free',
    stripeCurrentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    stripeSubscriptionId: '',
    stripeCustomerId: '123456',
  };

  if (!user) {
    throw new Error('User not found');
  }

  // Check if user is on a pro plan.
  const isPro =
    !!user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now();

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPro,
  };
}
