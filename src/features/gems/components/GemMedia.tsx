'use client';

import { Gem, GemType } from '@/features/gems/types/gems';
import { Icons } from '@/features/shared/components/Icons';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface GemMediaProps {
  gem: Gem;
  className?: string;
}

export function GemMedia({ gem, className }: GemMediaProps) {
  const { media } = gem.properties;
  const mainImage = media.coverImage || media.images?.[0];

  if (!mainImage) {
    return (
      <div className={cn('bg-gray-900 aspect-[2/1]', className)}>
        <div className="flex justify-center items-center h-full">
          <GemTypeIcon type={gem.type} className="w-20 h-20 text-white/20" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative bg-gray-900 aspect-[2/1]', className)}>
      <Image src={mainImage} alt={gem.title} fill className="object-cover" />
    </div>
  );
}

// Helper component for type-specific icons
function GemTypeIcon({ type, className }: { type: GemType; className?: string }) {
  const Icon = {
    music: Icons.Music,
    art: Icons.Image,
    craft: Icons.Hammer,
    'content-creation': Icons.FileText,
    words: Icons.FileText,
    video: Icons.Video,
    photography: Icons.Camera,
    'mixed-media': Icons.Image,
    other: Icons.FileText,
    'fiber-arts': Icons.Scissors,
    'digital-art': Icons.Monitor,
  }[type];

  return <Icon className={className} />;
}
