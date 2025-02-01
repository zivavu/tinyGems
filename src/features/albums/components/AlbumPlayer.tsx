'use client';

import { MusicGem } from '@/features/gems/types';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import Link from 'next/link';
import { useState } from 'react';

interface AlbumPlayerProps {
  gems: MusicGem[];
}

export function AlbumPlayer({ gems }: AlbumPlayerProps) {
  const [activeGemId, setActiveGemId] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden">
      {gems.map((gem, index) => (
        <div
          key={gem.id}
          className={`flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
            activeGemId === gem.id ? 'bg-gray-50 dark:bg-gray-800/50' : ''
          }`}
        >
          <Typography variant="h3" className="w-8 text-center text-gray-400">
            {(index + 1).toString().padStart(2, '0')}
          </Typography>

          <button onClick={() => setActiveGemId(activeGemId === gem.id ? null : gem.id)} className="flex items-center gap-4 flex-1">
            <div className="flex-1">
              <Typography variant="h3" className="font-medium">
                {gem.title}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                {gem.properties.duration}
              </Typography>
            </div>
          </button>

          <Link href={`/gem/song/${gem.id}`} className="p-2 text-gray-400 hover:text-rose-500 transition-colors">
            <Icons.ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      ))}
    </div>
  );
}
