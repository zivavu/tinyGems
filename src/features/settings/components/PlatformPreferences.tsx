'use client';

import { PlatformType } from '@/features/gems/types';
import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { useState } from 'react';

interface Platform {
  id: PlatformType;
  name: string;
}

interface PlatformPreferencesProps {
  platforms: Platform[];
}

export function PlatformPreferences({ platforms: initialPlatforms }: PlatformPreferencesProps) {
  const [platforms, setPlatforms] = useState(initialPlatforms);

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(platforms);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlatforms(items);
  }

  return (
    <div className="space-y-4">
      <Typography variant="small" className="text-gray-500">
        Drag to reorder platforms based on your preference. The first available platform will be used for playback.
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="platforms">
          {(dropable) => (
            <div {...dropable.droppableProps} ref={dropable.innerRef} className="relative space-y-2">
              {platforms.map((platform, index) => (
                <Draggable key={platform.id} draggableId={platform.id} index={index}>
                  {(draggable, snapshot) => (
                    <div
                      ref={draggable.innerRef}
                      {...draggable.draggableProps}
                      {...draggable.dragHandleProps}
                      className={`flex items-center gap-3 rounded-lg border border-rose-100 bg-white p-3 
                        dark:border-rose-900 dark:bg-gray-800 transition-colors
                        ${snapshot.isDragging ? 'shadow-lg ring-2 ring-rose-500 cursor-grabbing' : 'cursor-grab'}`}
                    >
                      <FontAwesomeIcon icon={platformIconsMap[platform.id]} className="h-5 w-5" />
                      <Typography variant="small">{platform.name}</Typography>
                      <Icons.GripVertical className="ml-auto h-4 w-4 text-gray-400" />
                    </div>
                  )}
                </Draggable>
              ))}
              {dropable.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
