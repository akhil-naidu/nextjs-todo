import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function UserAvatar({
  user,
  className,
  ...props
}: {
  user: any;
  className?: string;
}) {
  return (
    <Avatar {...props} className={className}>
      {user.image ? (
        <AvatarImage alt='Picture' src={user.image} />
      ) : (
        <AvatarFallback>
          <span className='sr-only'>{user.name}</span>
          <Icons.user className='h-4 w-4' />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
