"use client"

import { useState, useEffect } from 'react'
import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn, generateAvatarUrl, isValidAvatarUrl } from '@/lib/utils'

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
))
AvatarRoot.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

/**
 * Componente inteligente para exibir avatar com geração automática caso necessário
 */
interface SmartAvatarProps {
  name: string;
  avatarUrl?: string;
  className?: string;
  size?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  fallbackClassName?: string;
}

const SmartAvatar = ({
  name,
  avatarUrl,
  className,
  size = 200,
  backgroundColor = '4F46E5',
  foregroundColor = 'FFFFFF',
  fallbackClassName,
}: SmartAvatarProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);
  const [imgError, setImgError] = useState(false);
  
  // Verifica a validade do avatar e configura a fonte da imagem
  useEffect(() => {
    if (avatarUrl && isValidAvatarUrl(avatarUrl)) {
      setImgSrc(avatarUrl);
      setImgError(false);
    } else {
      setImgSrc(generateAvatarUrl(name, backgroundColor, foregroundColor, size));
      setImgError(false);
    }
  }, [avatarUrl, name, backgroundColor, foregroundColor, size]);

  // Handler para erros de carregamento de imagem
  const handleError = () => {
    setImgError(true);
    setImgSrc(generateAvatarUrl(name, backgroundColor, foregroundColor, size));
  };

  return (
    <AvatarRoot className={className}>
      {!imgError && imgSrc && (
        <AvatarImage 
          src={imgSrc} 
          alt={`Avatar de ${name}`}
          onError={handleError}
        />
      )}
      <AvatarFallback delayMs={600} className={fallbackClassName}>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </AvatarRoot>
  );
};

export { AvatarRoot, AvatarImage, AvatarFallback, SmartAvatar }
